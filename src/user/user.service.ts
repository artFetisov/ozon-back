import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdatePersonalDataDto } from './dto/updatePersonalData.dto'
import { UpdatePhoneDto } from './dto/updatePhone.dto'
import { MailService } from 'src/mail/mail.service'
import { TemporaryAuthDataService } from 'src/temporary-auth-data/temporary-auth-data.service'
import { AuthService } from 'src/auth/auth.service'
import * as bcrypt from 'bcryptjs'
import { UpdatePhoneCheckCodeDto } from './dto/updatePhoneCheckCode.dto'
import { UpdateEmailCheckCodeDto } from './dto/updateEmailCheckCode.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,
		private readonly mailService: MailService,
		private readonly temporaryAuthDataService: TemporaryAuthDataService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService
	) {}

	async getAll() {
		return this.userRepository.findAll({ include: { all: true } })
	}

	async createUser({ email }: CreateUserDto) {
		return this.userRepository.create({ email })
	}

	async getUserByEmail(email: string) {
		return this.userRepository.findOne({
			where: { email },
			include: { all: true },
		})
	}

	async getUserById(id: number) {
		return this.userRepository.findOne({
			where: { id },
			include: { all: true },
		})
	}

	async updatePersonalData(dto: UpdatePersonalDataDto, id: number) {
		const user = await this.getUserById(id)

		await user?.update({ ...dto })

		return user
	}

	async updatePhone({ phone, email }: UpdatePhoneDto): Promise<{ phone: string }> {
		const foundTempData = await this.temporaryAuthDataService.getByPropertyValue(email)

		await foundTempData?.destroy()

		const verificationCode = this.authService.generateCode(100000, 900000)
		const passwordHash = await bcrypt.hash(String(verificationCode), 5)

		await this.temporaryAuthDataService.createTemporaryAuthData({
			property: email,
			passwordHash,
		})

		await this.mailService.sendMail({
			code: verificationCode,
			to: email,
			message: 'Код для изменения телефона',
		})

		return { phone }
	}

	async updatePhoneCheckCode({ code, email, phone }: UpdatePhoneCheckCodeDto) {
		const foundedTempData = await this.temporaryAuthDataService.getByPropertyValue(email)

		if (!foundedTempData) {
			throw new HttpException('Неверные данные входа, попробуйте заново', HttpStatus.BAD_REQUEST)
		}

		const isComparePassword = await bcrypt.compare(code, foundedTempData.passwordHash)

		if (!isComparePassword) {
			throw new HttpException('Неверный код. Попробуйте еще раз', HttpStatus.UNAUTHORIZED)
		}

		const user = await this.getUserByEmail(email)

		if (!user) {
			throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED)
		}

		user.phone = phone
		await user.save()

		return user
	}

	async updateEmail({ email }: CreateUserDto, id: number) {
		const foundTempData = await this.temporaryAuthDataService.getByPropertyValue(email)

		await foundTempData?.destroy()

		const verificationCode = this.authService.generateCode(100000, 900000)
		const passwordHash = await bcrypt.hash(String(verificationCode), 5)

		await this.temporaryAuthDataService.createTemporaryAuthData({
			property: email,
			passwordHash,
		})

		await this.mailService.sendMail({
			code: verificationCode,
			to: email,
			message: 'Код для изменения почты',
		})

		return { email }
	}

	async updateEmailCheckCode({ email, code }: UpdateEmailCheckCodeDto, id: number) {
		const foundedTempData = await this.temporaryAuthDataService.getByPropertyValue(email)

		if (!foundedTempData) {
			throw new HttpException('Неверные данные входа, попробуйте заново', HttpStatus.BAD_REQUEST)
		}

		const isComparePassword = await bcrypt.compare(code, foundedTempData.passwordHash)

		if (!isComparePassword) {
			throw new HttpException('Неверный код. Попробуйте еще раз', HttpStatus.UNAUTHORIZED)
		}

		const user = await this.getUserById(id)

		if (!user) {
			throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED)
		}

		user.email = email
		await user.save()

		return user
	}
}

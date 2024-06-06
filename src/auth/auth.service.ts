import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { LoginByEmailDto } from './dto/loginByEmail.dto'
import { MailService } from 'src/mail/mail.service'
import { TemporaryAuthDataService } from 'src/temporary-auth-data/temporary-auth-data.service'
import { CheckCodeByEmailDto } from './dto/loginByEmailCheckCode'
import { TokenService } from 'src/token/token.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly mailService: MailService,
		private readonly temporaryAuthDataService: TemporaryAuthDataService,
		private readonly tokenService: TokenService
	) {}

	async loginByEmail({ email }: LoginByEmailDto) {
		const foundedTempData = await this.temporaryAuthDataService.getByPropertyValue(email)

		foundedTempData?.destroy()

		const candidate = await this.userService.getUserByEmail(email)

		const verificationCode = this.generateCode(100000, 900000)
		const passwordHash = await bcrypt.hash(String(verificationCode), 5)

		await this.temporaryAuthDataService.createTemporaryAuthData({
			property: email,
			passwordHash,
		})

		await this.mailService.sendMail({ code: verificationCode, to: email })

		return { email, isNewUser: candidate?.isNewUser ?? true }
	}

	async checkCodeByEmail({ email, code }: CheckCodeByEmailDto) {
		let user

		const foundedTempData = await this.temporaryAuthDataService.getByPropertyValue(email)

		if (!foundedTempData) {
			throw new HttpException('Неверные данные входа, попробуйте заново', HttpStatus.BAD_REQUEST)
		}

		const isComparePassword = await bcrypt.compare(code, foundedTempData.passwordHash)

		if (!isComparePassword) {
			throw new HttpException('Неверный код. Попробуйте еще раз', HttpStatus.UNAUTHORIZED)
		}

		user = await this.userService.getUserByEmail(email)

		if (!user) {
			user = await this.userService.createUser({ email })
			user.isNewUser = false
			user.save()
		}

		const tokens = await this.tokenService.issueTokenPair(user)

		await this.tokenService.saveToken(user.id, tokens.refreshToken)

		await foundedTempData.destroy()

		return {
			user,
			tokens,
		}
	}

	private generateCode(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min)
	}
}

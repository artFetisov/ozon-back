import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { LoginByEmailDto } from './dto/loginByEmail.dto'
import { MailService } from 'src/mail/mail.service'
import { TemporaryAuthDataService } from 'src/temporary-auth-data/temporary-auth-data.service'
import { CheckCodeByEmailDto } from './dto/loginByEmailCheckCode'
import { TokenService } from 'src/token/token.service'
import { UserService } from 'src/user/user.service'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly mailService: MailService,
		private readonly temporaryAuthDataService: TemporaryAuthDataService,
		private readonly tokenService: TokenService,
		private readonly configService: ConfigService
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

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) {
			throw new HttpException(
				'Неправильные данные входа, зарегистрируйтесь или войдите в личный кабинет',
				HttpStatus.UNAUTHORIZED
			)
		}

		const result = await this.tokenService.validateToken(
			refreshToken,
			this.configService.get('PRIVATE_KEY_REFRESH') as string
		)
		if (!result) {
			throw new HttpException('Неверный токен доступа', HttpStatus.UNAUTHORIZED)
		}

		const foundToken = await this.tokenService.findToken(refreshToken)

		if (!foundToken) {
			throw new HttpException('Неверный токен обновления', HttpStatus.BAD_REQUEST)
		}

		const user = await this.userService.getUserByEmail(result.email)

		if (!user) {
			throw new HttpException(
				'Неправильные данные входа, зарегистрируйтесь или войдите в личный кабинет',
				HttpStatus.UNAUTHORIZED
			)
		}

		const tokens = await this.tokenService.issueTokenPair(user)

		await this.tokenService.saveToken(user.id, tokens.refreshToken)

		return {
			user,
			tokens,
		}
	}

	async logout({ refreshToken }: RefreshTokenDto) {
		await this.tokenService.removeToken(refreshToken)
	}

	async authMe(userId: number) {
		const user = await this.userService.getUserById(userId)

		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
		}

		const tokens = await this.tokenService.issueTokenPair(user)

		await this.tokenService.saveToken(user.id, tokens.refreshToken)

		return {
			user,
			tokens,
		}
	}

	async loginByPhone() {
		throw new HttpException(
			'К сожалению пока не реализован вход в аккаунт по номеру телефона. Войдите по почте.',
			HttpStatus.NOT_FOUND
		)
	}
}

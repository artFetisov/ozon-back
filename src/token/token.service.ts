import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Token } from './token.model'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from 'src/user/user.model'

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(Token) private tokenRepository: typeof Token,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async issueTokenPair(user: User) {
		const payload = { id: user.id, email: user.email }

		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get('PRIVATE_KEY_REFRESH'),
			expiresIn: '30d',
		})
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get('PRIVATE_KEY_ACCESS'),
			expiresIn: '15m',
		})

		return {
			refreshToken,
			accessToken,
		}
	}

	async validateToken(token: string, secretKey: string) {
		return this.jwtService.verifyAsync(token, { secret: secretKey })
	}

	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await this.tokenRepository.findOne({ where: { userId } })

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}
		return this.tokenRepository.create({ userId, refreshToken })
	}

	async findToken(refreshToken: string) {
		return this.tokenRepository.findOne({ where: { refreshToken } })
	}

	async removeToken(refreshToken: string) {
		const token = await this.findToken(refreshToken)

		if (!token) {
			throw new HttpException('Неверный токен доступа', HttpStatus.UNAUTHORIZED)
		}

		await token.destroy()

		return token
	}
}

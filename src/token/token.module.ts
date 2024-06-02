import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Token } from './token.model'
import { User } from 'src/user/user.model'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/configs/jwt.config'

@Module({
	providers: [TokenService],
	imports: [
		SequelizeModule.forFeature([Token, User]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	exports: [TokenService],
})
export class TokenModule {}

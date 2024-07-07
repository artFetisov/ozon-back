import { TokenModule } from './../token/token.module'
import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { MailModule } from 'src/mail/mail.module'
import { TemporaryAuthDataModule } from 'src/temporary-auth-data/temporary-auth-data.module'
import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	imports: [
		MailModule,
		TemporaryAuthDataModule,
		forwardRef(() => UserModule),
		TokenModule,
		ConfigModule,
		PassportModule,
	],
	exports: [AuthService],
})
export class AuthModule {}

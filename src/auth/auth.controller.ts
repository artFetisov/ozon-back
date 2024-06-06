import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginByEmailDto } from './dto/loginByEmail.dto'
import { CheckCodeByEmailDto } from './dto/loginByEmailCheckCode'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login-by-email')
	loginByEmail(@Body() loginByEmailDto: LoginByEmailDto) {
		return this.authService.loginByEmail(loginByEmailDto)
	}

	@Post('check-code-by-email')
	checkVerificationCode(@Body() checkCodeDto: CheckCodeByEmailDto) {
		return this.authService.checkCodeByEmail(checkCodeDto)
	}
}

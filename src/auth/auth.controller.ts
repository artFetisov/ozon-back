import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginByEmailDto } from './dto/loginByEmail.dto'
import { CheckCodeByEmailDto } from './dto/loginByEmailCheckCode'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { JwtAuthGuard } from './guards/jwt.guard'
import { UserData } from 'src/user/decorators/user-data.decorator'
import { User } from 'src/user/user.model'
import { LoginByPhoneDto } from './dto/loginByPhone.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('login-by-email')
	loginByEmail(@Body() loginByEmailDto: LoginByEmailDto) {
		return this.authService.loginByEmail(loginByEmailDto)
	}

	@UsePipes(new ValidationPipe())
	@Post('login-by-phone')
	loginByPhone(@Body() loginByPhoneDto: LoginByPhoneDto) {
		return this.authService.loginByPhone()
	}

	@UsePipes(new ValidationPipe())
	@Post('check-code-by-email')
	checkVerificationCode(@Body() checkCodeDto: CheckCodeByEmailDto) {
		return this.authService.checkCodeByEmail(checkCodeDto)
	}

	@UsePipes(new ValidationPipe())
	@Post('get-new-tokens')
	getNewTokens(@Body() refreshTokenDto: RefreshTokenDto) {
		return this.authService.getNewTokens(refreshTokenDto)
	}

	@UsePipes(new ValidationPipe())
	@Post('/logout')
	@HttpCode(200)
	logout(@Body() refreshTokenDto: RefreshTokenDto) {
		return this.authService.logout(refreshTokenDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/me')
	@HttpCode(200)
	authMe(@UserData() { id }: Pick<User, 'id'>) {
		return this.authService.authMe(id)
	}
}

import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginByEmailDto } from './dto/loginByEmail.dto'
// import { AuthDto } from './dto/auth.dto'
// import { RefreshTokenDto } from './dto/refresh-token.dto'
// import { JwtAuthGuard } from './guards/jwt.guard'
// import { UserData } from 'src/users/decorators/user-data.decorator'
// import { User } from 'src/users/users.model'
// import { AvailableUsersTokensDto } from './dto/dataUsers.dto'
// import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login-by-email')
  loginByEmail(@Body() loginByEmailDto: LoginByEmailDto) {
    return this.authService.loginByEmail(loginByEmailDto)
  }

  //   @UsePipes(new ValidationPipe())
  //   @Post('/login')
  //   @HttpCode(200)
  //   login(@Body() authDto: AuthDto) {
  //     return this.authService.login(authDto)
  //   }

  //   @UsePipes(new ValidationPipe())
  //   @Post('/registration')
  //   registration(@Body() authDto: AuthDto) {
  //     return this.authService.registration(authDto)
  //   }

  //   @UsePipes(new ValidationPipe())
  //   @Post('/refresh')
  //   @HttpCode(200)
  //   refresh(@Body() refreshTokenDto: RefreshTokenDto) {
  //     return this.authService.refreshTokens(refreshTokenDto)
  //   }

  //   @UsePipes(new ValidationPipe())
  //   @Post('/logout')
  //   @HttpCode(200)
  //   logout(@Body() refreshTokenDto: RefreshTokenDto) {
  //     return this.authService.logout(refreshTokenDto)
  //   }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('/me')
  //   @HttpCode(200)
  //   authMe(@UserData() { id }: Pick<User, 'id'>) {
  //     return this.authService.authMe(id)
  //   }

  //   @Post('/get-available-accounts')
  //   @HttpCode(200)
  //   getVerifyUsers(@Body() dataUsers: AvailableUsersTokensDto) {
  //     return this.authService.getVerifyUsers(dataUsers)
  //   }

  //   @UsePipes(new ValidationPipe())
  //   @Get('/check-user-exist-login')
  //   checkUserExistLogin(@Req() request: Request) {
  //     const email = request.query.email as string
  //     return this.authService.checkUserExistLogin(email)
  //   }

  //   @UsePipes(new ValidationPipe())
  //   @Get('/check-user-exist-register')
  //   checkUserExistRegister(@Req() request: Request) {
  //     const email = request.query.email as string
  //     return this.authService.checkUserExistRegister(email)
  //   }
}

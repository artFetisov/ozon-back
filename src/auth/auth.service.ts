import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/user/user.service'
import { LoginByEmailDto } from './dto/loginByEmail.dto'
import { MailService } from 'src/mail/mail.service'
import { TemporaryAuthDataService } from 'src/temporary-auth-data/temporary-auth-data.service'

// export interface AllSettledUserData {
//   status?: 'rejected' | 'fulfilled'
//   value?: { id: number; email: string }
// }

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly temporaryAuthDataService: TemporaryAuthDataService
  ) {}

  async loginByEmail({ email }: LoginByEmailDto) {
    let isNewUser = true

    const candidate = await this.userService.getUserByEmail(email)

    if (candidate) {
      isNewUser = false
    }

    const verificationCode = this.generateCode(1000, 9000)
    const passwordHash = await bcrypt.hash(String(verificationCode), 5)

    await this.temporaryAuthDataService.createTemporaryAuthData({
      property: email,
      passwordHash,
    })

    await this.mailService.sendMail({ code: verificationCode, to: email })

    return { email, isNewUser }
  }

  async checkVerificationCode() {}

  generateCode(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  //   async registration({ email, password }: AuthDto) {
  //     const candidate = await this.userService.getUserByEmail(email)
  //     if (candidate) {
  //       throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
  //     }

  //     const hashPassword = await bcrypt.hash(password, 5)

  //     const user = await this.userService.createUser({
  //       email,
  //       password: hashPassword,
  //     })

  //     const tokens = await this.tokenService.issueTokenPair(user)

  //     await this.tokenService.saveToken(user.id, tokens.refreshToken)

  //     return {
  //       user: this.getUserFields(user),
  //       tokens,
  //     }
  //   }

  //   private getUserFields(user: User) {
  //     return {
  //       id: user.id,
  //       email: user.email,
  //     }
  //   }

  //   async login(authDto: AuthDto) {
  //     const user = await this.validateUser(authDto)

  //     const tokens = await this.tokenService.issueTokenPair(user)

  //     await this.tokenService.saveToken(user.id, tokens.refreshToken)

  //     return {
  //       user: this.getUserFields(user),
  //       tokens,
  //     }
  //   }

  //   private async validateUser(authDto: AuthDto) {
  //     const user = await this.userService.getUserByEmail(authDto.email)
  //     if (!user) {
  //       throw new HttpException('Пользователь с таким email не найден', HttpStatus.NOT_FOUND)
  //     }

  //     const isComparePassword = await bcrypt.compare(authDto.password, user.passwordHash)
  //     if (!isComparePassword) {
  //       throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED)
  //     }

  //     return user
  //   }

  //   async refreshTokens({ refreshToken }: RefreshTokenDto) {
  //     if (!refreshToken) {
  //       throw new HttpException(
  //         'Пожалуйста зарегистрируйтесь или войдите, неправильный refresh-token',
  //         HttpStatus.UNAUTHORIZED
  //       )
  //     }

  //     const result = await this.tokenService.validateToken(refreshToken, this.configService.get('PRIVATE_KEY_REFRESH'))
  //     if (!result) {
  //       throw new HttpException('Неверный токен доступа', HttpStatus.UNAUTHORIZED)
  //     }

  //     const foundToken = await this.tokenService.findToken(refreshToken)
  //     console.log('----', foundToken, '---')
  //     if (!foundToken) {
  //       throw new HttpException('Неверный токен обновления', HttpStatus.BAD_REQUEST)
  //     }

  //     const user = await this.userService.getUserByEmail(result.email)

  //     const tokens = await this.tokenService.issueTokenPair(user)

  //     return {
  //       user: this.getUserFields(user),
  //       tokens,
  //     }
  //   }

  //   async authMe(userId: number) {
  //     const user = await this.userService.getUserById(userId)

  //     if (!user) {
  //       throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
  //     }

  //     const tokens = await this.tokenService.issueTokenPair(user)

  //     await this.tokenService.saveToken(user.id, tokens.refreshToken)

  //     return {
  //       user: this.getUserFields(user),
  //       tokens,
  //     }
  //   }

  //   async logout({ refreshToken }: RefreshTokenDto) {
  //     await this.tokenService.removeToken(refreshToken)
  //   }

  //   async checkUserExistLogin(email: string) {
  //     const user = await this.userService.getUserByEmail(email)

  //     if (!user) {
  //       throw new HttpException('Пользователь с таким email не найден', HttpStatus.NOT_FOUND)
  //     }

  //     return {
  //       user: this.getUserFields(user),
  //     }
  //   }

  //   async checkUserExistRegister(email: string) {
  //     const user = await this.userService.getUserByEmail(email)

  //     if (user) {
  //       throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
  //     }
  //   }

  //   async getVerifyUsers(usersData: AvailableUsersTokensDto) {
  //     if (!usersData.tokens) {
  //       return
  //     }

  //     const result = await Promise.allSettled(
  //       usersData.tokens.map(async (tokenPair) => {
  //         const validatedData: { id: number; email: string } = await this.tokenService.validateToken(
  //           tokenPair.refreshToken,
  //           this.configService.get('PRIVATE_KEY_REFRESH')
  //         )
  //         if (!validatedData) return

  //         const currentUser = await this.userService.getUserById(validatedData.id)
  //         if (!currentUser) return

  //         const tokens = await this.tokenService.issueTokenPair(currentUser)

  //         await this.tokenService.saveToken(currentUser.id, tokens.refreshToken)

  //         return {
  //           user: this.getUserFields(currentUser),
  //           tokens,
  //         }
  //       })
  //     )

  //     return result.filter((r) => r.status === 'fulfilled')
  //   }
}

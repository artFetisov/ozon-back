import { IsEmail, IsString } from 'class-validator'

export class LoginByEmailDto {
  @IsString({ message: 'Email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string
}

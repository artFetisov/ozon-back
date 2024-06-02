import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class CheckCodeByEmailDto {
  @IsString({ message: 'Email должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string

  @IsString({ message: 'Проверочный код должен быть строкой' })
  @IsNotEmpty()
  code: string
}

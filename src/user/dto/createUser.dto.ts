import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	email: string
}

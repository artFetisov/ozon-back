import { IsString, IsPhoneNumber, IsEmail } from 'class-validator'

export class UpdatePhoneDto {
	@IsString({ message: 'Телефон должен быть строкой' })
	@IsPhoneNumber(undefined, { message: 'Невалидный номер телефона' })
	phone: string

	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	email: string
}

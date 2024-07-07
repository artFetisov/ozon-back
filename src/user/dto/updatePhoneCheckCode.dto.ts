import { IsString, IsPhoneNumber, IsEmail, IsNotEmpty } from 'class-validator'

export class UpdatePhoneCheckCodeDto {
	@IsString({ message: 'Телефон должен быть строкой' })
	@IsPhoneNumber()
	phone: string

	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	email: string

	@IsString({ message: 'Проверочный код должен быть строкой' })
	@IsNotEmpty()
	code: string
}

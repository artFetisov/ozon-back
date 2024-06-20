import { IsString, IsPhoneNumber } from 'class-validator'

export class UpdatePhoneDto {
	@IsString({ message: 'Телефон должен быть строкой' })
	@IsPhoneNumber()
	phone: string
}

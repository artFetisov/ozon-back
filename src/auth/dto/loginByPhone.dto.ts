import { IsPhoneNumber } from 'class-validator'

export class LoginByPhoneDto {
	@IsPhoneNumber(undefined, { message: 'Невалидный номер телефона' })
	phone: string
}

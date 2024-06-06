import { IsString, IsDate, IsEnum, IsOptional } from 'class-validator'
import { GenderEnum } from '../types/gender.types'
import { Type } from 'class-transformer'

export class UpdatePersonalDataDto {
	@IsString()
	name: string

	@IsString()
	lastName: string

	@IsString()
	patronymic: string

	@IsString()
	@IsEnum(GenderEnum)
	gender: GenderEnum

	@IsOptional()
	@Type(() => Date)
	@IsDate({})
	birthdayDate: Date
}

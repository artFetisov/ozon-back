import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class SubCategoryDto {
	@IsString({ message: 'Title должен быть строкой' })
	title: string

	@IsString({ message: 'Slug должен быть строкой' })
	slug: string
}

export class CreateSubCategoryDto {
	@IsNotEmpty()
	@IsNumber()
	categoryId: number

	@Type(() => SubCategoryDto)
	@ValidateNested({ each: true })
	readonly subCategories: SubCategoryDto[]
}

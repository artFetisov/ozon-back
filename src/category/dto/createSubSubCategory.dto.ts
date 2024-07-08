import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class SubSubCategoryDto {
	@IsString({ message: 'Title должен быть строкой' })
	title: string

	@IsString({ message: 'Slug должен быть строкой' })
	slug: string
}

export class CreateSubSubCategoryDto {
	@IsNotEmpty()
	@IsNumber()
	categoryId: number

	@IsNotEmpty()
	@IsNumber()
	subCategoryId: number

	@IsArray()
	@Type(() => SubSubCategoryDto)
	@ValidateNested({ each: true })
	readonly subSubCategories: SubSubCategoryDto[]
}

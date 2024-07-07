import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsString({ message: 'Title должен быть строкой' })
	@IsNotEmpty()
	title: string

	@IsString({ message: 'Slug код должен быть строкой' })
	@IsNotEmpty()
	slug: string
}

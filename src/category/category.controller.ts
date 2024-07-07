import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/createCategory.dto'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}
	@Get()
	getAll() {
		return this.categoryService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@Post()
	createCategory(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.createCategory(createCategoryDto)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	updateCategory(@Param('id') categoryId: number, @Body() updateCategoryDto: CreateCategoryDto) {
		return this.categoryService.updateCategory(updateCategoryDto, categoryId)
	}

	@UsePipes(new ValidationPipe())
	@Delete(':id')
	deleteCategory(@Param('id') categoryId: number) {
		return this.categoryService.deleteCategory(categoryId)
	}
}
 
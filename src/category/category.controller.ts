import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { CreateSubCategoryDto } from './dto/createSubCategory.dto'
import { CreateSubSubCategoryDto } from './dto/createSubSubCategory.dto'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	// categories
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

	//sub-categories
	@UsePipes(new ValidationPipe())
	@Get('sub')
	getAllSubCat() {
		return this.categoryService.getAllSubCat()
	}

	@UsePipes(new ValidationPipe())
	@Post('sub')
	createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
		return this.categoryService.createSubCategory(createSubCategoryDto)
	}

	@UsePipes(new ValidationPipe())
	@Put('sub/:id')
	updateSubCategory(@Param('id') subCategoryId: number, @Body() updateSubCategoryDto: CreateCategoryDto) {
		return this.categoryService.updateSubCategory(updateSubCategoryDto, subCategoryId)
	}

	@UsePipes(new ValidationPipe())
	@Delete('sub/:id')
	deleteSubCategory(@Param('id') subCategoryId: number) {
		return this.categoryService.deleteSubCategory(subCategoryId)
	}

	// sub-sub-categories
	@UsePipes(new ValidationPipe())
	@Get('sub/sub')
	getAllSubSubCat() {
		return this.categoryService.getAllSubSubCat()
	}

	@UsePipes(new ValidationPipe())
	@Post('sub/sub')
	createSubSubCategory(@Body() createSubSubCategoryDto: CreateSubSubCategoryDto) {
		return this.categoryService.createSubSubCategory(createSubSubCategoryDto)
	}

	@UsePipes(new ValidationPipe())
	@Put('sub/sub/:id')
	updateSubSubCategory(@Param('id') subSubCategoryId: number, @Body() updateSubSubCategoryDto: CreateCategoryDto) {
		return this.categoryService.updateSubSubCategory(updateSubSubCategoryDto, subSubCategoryId)
	}

	@UsePipes(new ValidationPipe())
	@Delete('sub/sub/:id')
	deleteSubSubCategory(@Param('id') subSubCategoryId: number) {
		return this.categoryService.deleteSubSubCategory(subSubCategoryId)
	}
}

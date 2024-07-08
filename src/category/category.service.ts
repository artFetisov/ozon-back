import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Category } from './category.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { CreateSubCategoryDto } from './dto/createSubCategory.dto'
import { SubCategory } from './sub-category.model'
import { SubSubCategory } from './sub-sub-category.model'
import { CreateSubSubCategoryDto } from './dto/createSubSubCategory.dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category) private readonly categoryRepository: typeof Category,
		@InjectModel(SubCategory) private readonly subCategoryRepository: typeof SubCategory,
		@InjectModel(SubSubCategory) private readonly subSubCategoryRepository: typeof SubSubCategory
	) {}

	async getAll() {
		return this.categoryRepository.findAll({ include: { all: true } })
	}

	async getCategoryById(id: number) {
		return this.categoryRepository.findOne({
			where: { id },
			include: { all: true },
		})
	}

	async getCategoryBySlug(slug: string) {
		return this.categoryRepository.findOne({
			where: { slug },
			include: { all: true },
		})
	}

	async createCategory(dto: CreateCategoryDto) {
		return this.categoryRepository.create({ ...dto })
	}

	async updateCategory(dto: CreateCategoryDto, id: number) {
		const category = await this.categoryRepository.findOne({
			where: { id },
			include: { all: true },
		})

		if (!category) {
			throw new HttpException('Категория не найдена', HttpStatus.NOT_FOUND)
		}

		await category.update({ ...dto })

		return category
	}

	async deleteCategory(id: number) {
		const category = await this.categoryRepository.findOne({ where: { id } })

		if (!category) {
			throw new HttpException('Категория не найдена', HttpStatus.NOT_FOUND)
		}

		await category.destroy()

		return category
	}

	async getAllSubCat() {
		return this.subCategoryRepository.findAll({ include: { all: true } })
	}

	async createSubCategory({ categoryId, subCategories }: CreateSubCategoryDto) {
		const category = await this.getCategoryById(categoryId)

		if (!category) {
			throw new HttpException('Податегория не найдена', HttpStatus.NOT_FOUND)
		}

		const result = await Promise.all(
			subCategories.map(async (subCat) => {
				return await this.subCategoryRepository.create({ ...subCat, categoryId: category.id })
			})
		)

		return result
	}

	async updateSubCategory(dto: CreateCategoryDto, id: number) {
		const subCategory = await this.subCategoryRepository.findOne({
			where: { id },
		})

		if (!subCategory) {
			throw new HttpException('Подкатегория не найдена', HttpStatus.NOT_FOUND)
		}

		await subCategory.update({ ...dto })

		return subCategory
	}

	async deleteSubCategory(id: number) {
		const subCategory = await this.subCategoryRepository.findOne({ where: { id } })

		if (!subCategory) {
			throw new HttpException('Подкатегория не найдена', HttpStatus.NOT_FOUND)
		}

		await subCategory.destroy()

		return subCategory
	}

	async getAllSubSubCat() {
		return this.subSubCategoryRepository.findAll({ include: { all: true } })
	}

	async createSubSubCategory({ categoryId, subCategoryId, subSubCategories }: CreateSubSubCategoryDto) {
		const category = await this.getCategoryById(categoryId)
		const subCategory = await this.subCategoryRepository.findOne({ where: { id: subCategoryId } })

		if (!category || !subCategory) {
			throw new HttpException('Податегория не найдена', HttpStatus.NOT_FOUND)
		}

		const result = await Promise.all(
			subSubCategories.map(async (subSubCat) => {
				return this.subSubCategoryRepository.create({
					...subSubCat,
					categoryId: category.id,
					subCategoryId: subCategory.id,
				})
			})
		)

		return result
	}

	async updateSubSubCategory(dto: CreateCategoryDto, id: number) {
		const subSubCategory = await this.subSubCategoryRepository.findOne({
			where: { id },
		})

		if (!subSubCategory) {
			throw new HttpException('Подкатегория не найдена', HttpStatus.NOT_FOUND)
		}

		await subSubCategory.update({ ...dto })

		return subSubCategory
	}

	async deleteSubSubCategory(id: number) {
		const subSubCategory = await this.subSubCategoryRepository.findOne({ where: { id } })

		if (!subSubCategory) {
			throw new HttpException('Подкатегория не найдена', HttpStatus.NOT_FOUND)
		}

		await subSubCategory.destroy()

		return subSubCategory
	}
}

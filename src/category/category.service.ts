import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Category } from './category.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateCategoryDto } from './dto/createCategory.dto'

@Injectable()
export class CategoryService {
	constructor(@InjectModel(Category) private readonly categoryRepository: typeof Category) {}

	async getAll() {
		return this.categoryRepository.findAll({ include: { all: true } })
	}

	async getBySlug({ slug }: { slug: string }) {
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
}

import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Category } from './category.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { SubCategory } from './sub-category.model'
import { SubSubCategory } from './sub-sub-category.model'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [SequelizeModule.forFeature([Category, SubCategory, SubSubCategory])],
	exports: [CategoryService],
})
export class CategoryModule {}

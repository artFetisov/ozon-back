import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Category } from './category.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [SequelizeModule.forFeature([Category])],
	exports: [CategoryService],
})
export class CategoryModule {}

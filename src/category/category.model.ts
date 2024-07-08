import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { SubCategory } from './sub-category.model'
import { SubSubCategory } from './sub-sub-category.model'

interface CategoryCreationsAttrs {
	title: string
	slug: string
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationsAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	title: string

	@Column({ type: DataType.STRING, allowNull: false })
	slug: string

	@HasMany(() => SubCategory)
	subCategories: SubCategory[]

	@HasMany(() => SubSubCategory)
	subSubCategories: SubSubCategory[]
}

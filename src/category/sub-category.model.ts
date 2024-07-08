import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { SubSubCategory } from './sub-sub-category.model'
import { Category } from './category.model'

interface SubCategoryCreationsAttrs {
	title: string
	slug: string
	categoryId: number
}

@Table({ tableName: 'sub-category' })
export class SubCategory extends Model<SubCategory, SubCategoryCreationsAttrs> {
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

	@HasMany(() => SubSubCategory)
	subSubCategories: SubSubCategory[]

	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER })
	categoryId: number

	@BelongsTo(() => Category)
	category: Category
}

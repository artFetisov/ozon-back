import { Category } from './category.model'
import { SubCategory } from './sub-category.model'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

interface SubSubCategoryCreationsAttrs {
	title: string
	slug: string
	categoryId: number
	subCategoryId: number
}

@Table({ tableName: 'sub-sub-category' })
export class SubSubCategory extends Model<SubSubCategory, SubSubCategoryCreationsAttrs> {
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

	@ForeignKey(() => SubCategory)
	@Column({ type: DataType.INTEGER })
	subCategoryId: number

	@BelongsTo(() => SubCategory)
	subCategory: SubCategory

	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER })
	categoryId: number

	@BelongsTo(() => Category)
	category: Category
}

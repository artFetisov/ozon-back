import { Column, DataType, Model, Table } from 'sequelize-typescript'

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

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	title: string

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	slug: string
}

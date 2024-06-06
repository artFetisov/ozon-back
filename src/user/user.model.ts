import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { GenderEnum } from './types/gender.types'

interface UserCreationsAttrs {
	email: string
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationsAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@Column({ type: DataType.STRING })
	name: string

	@Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
	isNewUser: boolean

	@Column({ type: DataType.STRING })
	lastName: string

	@Column({ type: DataType.STRING })
	patronymic: string

	@Column({
		type: DataType.ENUM,
		values: [GenderEnum.FEMALE, GenderEnum.MALE],
		defaultValue: '',
	})
	gender: GenderEnum

	@Column({ type: DataType.DATE, defaultValue: null })
	birthdayDate: Date

	@Column({ type: DataType.STRING, defaultValue: null })
	phone: string

	@Column({ type: DataType.BLOB, defaultValue: null })
	avatar: string
}

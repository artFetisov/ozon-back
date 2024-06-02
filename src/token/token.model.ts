import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface RefreshTokenCreationsAttrs {
	userId: number
	refreshToken: string
}

@Table({ tableName: 'refreshToken' })
export class Token extends Model<Token, RefreshTokenCreationsAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	refreshToken: string

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number
}

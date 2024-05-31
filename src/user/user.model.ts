import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { GenderEnum } from './types/gender.types'

interface UserCreationsAttrs {}

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

  //   @Column({ type: DataType.STRING, allowNull: false })
  //   passwordHash: string

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string

  @Column({ type: DataType.STRING, allowNull: false })
  patronymic: string

  @Column({
    type: DataType.ENUM,
    values: [GenderEnum.FEMALE, GenderEnum.MALE],
    allowNull: false,
  })
  gender: string

  @Column({ type: DataType.DATE, defaultValue: null })
  birthdayDate: Date

  @Column({ type: DataType.STRING, defaultValue: null })
  phone: string

  @Column({ type: DataType.BLOB, defaultValue: null })
  avatar: string
}

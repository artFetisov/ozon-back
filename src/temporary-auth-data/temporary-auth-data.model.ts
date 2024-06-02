import { Table, Column, DataType, Model } from 'sequelize-typescript'

interface TemporaryAuthDataCreationsAttrs {
  property: string
  passwordHash: string
}

@Table({ tableName: 'temporary' })
export class TemporaryAuthData extends Model<
  TemporaryAuthData,
  TemporaryAuthDataCreationsAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  property: string

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash: string
}

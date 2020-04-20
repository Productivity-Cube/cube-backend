import { AllowNull, Column, DataType, Model, PrimaryKey, Table, Unique, HasOne } from 'sequelize-typescript'
import { ApiKey } from './apiKey'

@Table({
  timestamps: true,
})
export class User extends Model<User> {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public uuid?: string

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public name?: string

  // tslint:disable-next-line:typedef
  @HasOne(() => ApiKey)
  public apiKey?: ApiKey
}

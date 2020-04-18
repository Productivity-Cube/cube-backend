import { AllowNull, Column, DataType, HasOne, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'
import { ApiKey, ApiKeyModel } from './apiKey'

export interface UserModel {
  uuid?: string
  name?: string
  apiKey?: ApiKeyModel
}

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

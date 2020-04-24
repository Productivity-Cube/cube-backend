import { AllowNull, Column, DataType, HasOne, Model, PrimaryKey, Table, Unique, HasMany } from 'sequelize-typescript'
import { ApiKey, ApiKeyModel } from './apiKey'
import { Event } from './event'

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

  // tslint:disable-next-line:typedef
  @HasMany(() => Event)
  public events?: Event
}

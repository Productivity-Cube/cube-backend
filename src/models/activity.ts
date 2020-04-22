import { AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'
import { ApiKeyModel } from './apiKey'
import { Event } from './event'

export interface ActivityModel {
  uuid?: string
  name?: string
  apiKey?: ApiKeyModel
}

@Table({
  tableName: 'Activities',
  timestamps: false,
})
export class Activity extends Model<Activity> {
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
  @HasMany(() => Event)
  public events?: Event
}

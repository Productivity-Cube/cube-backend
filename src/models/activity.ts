import { AllowNull, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'
import { ApiKeyModel } from './apiKey'

export interface ActivityModel {
  uuid?: string
  name?: string
  apiKey?: ApiKeyModel
}

@Table({
  tableName: 'Activities',
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
}

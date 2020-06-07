import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript'
import { User } from './user'
import { Activity } from './activity'

export interface EventPrediction {
  prediction: number
  accuracy: number
}

export interface EventModel {
  uuid?: string
  user?: User
  userId?: string
  activity?: User
  activityId?: string
  productivityRate?: number
  productivityPrediction?: EventPrediction
  time?: number
  createdAt?: Date | string
}

@Table({
  timestamps: true,
})
export class Event extends Model<Event> implements EventModel {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public uuid?: string

  // tslint:disable-next-line:typedef
  @BelongsTo(() => User)
  public user?: User

  // tslint:disable-next-line:typedef
  @ForeignKey(() => User)
  @Column
  public userId?: string

  // tslint:disable-next-line:typedef
  @BelongsTo(() => Activity)
  public activity?: Activity

  // tslint:disable-next-line:typedef
  @ForeignKey(() => Activity)
  @Column
  public activityId?: string

  @AllowNull(true)
  @Column
  public productivityRate?: number

  @Column
  public time?: number

  createdAt?: Date | string
}

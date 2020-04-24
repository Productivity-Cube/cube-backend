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

export interface EventModel {
  uuid?: string
  key?: string
  user?: User
  userId?: string
  activity?: User
  activityId?: string
  productivityRate?: number
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

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public key?: string

  // tslint:disable-next-line:typedef
  @BelongsTo(() => User)
  public user?: User

  // tslint:disable-next-line:typedef
  @ForeignKey(() => User)
  @Column
  public userId?: string

  // tslint:disable-next-line:typedef
  @BelongsTo(() => User)
  public activity?: Activity

  // tslint:disable-next-line:typedef
  @ForeignKey(() => User)
  @Column
  public activityId?: string

  @AllowNull(true)
  @Column
  public productivityRate?: number
}

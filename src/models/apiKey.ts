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

export interface ApiKeyModel {
  uuid?: string
  key?: string
  user?: User
  userId?: string
}

@Table({
  timestamps: true,
})
export class ApiKey extends Model<ApiKey> implements ApiKeyModel {
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
}

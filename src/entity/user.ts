import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiKey, ApiKeyModel } from './apiKey'

export interface UserModel {
  uuid?: string
  name?: string
  apiKey?: ApiKeyModel
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public uuid?: string

  @Column()
  public name?: string

  public apiKey?: ApiKey
}

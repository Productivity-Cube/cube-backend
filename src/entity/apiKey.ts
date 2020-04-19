import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

export interface ApiKeyModel {
  uuid: string
  key: string
  user?: User
}

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  public uuid?: string

  @Column()
  public key?: string

  // tslint:disable-next-line:no-unused typedef
  @OneToOne(type => User)
  @JoinColumn()
  public user?: User
}

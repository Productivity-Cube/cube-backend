import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/user'
import { ApiKey } from '../models/apiKey'
import { Activity } from '../models/activity'
import { Event } from '../models/event'

export class Database {
  private readonly sequelize: Sequelize

  constructor (connectionInfo: string) {
    this.sequelize = new Sequelize(connectionInfo, {
      logging: true
    })
    this.registerModels()
  }

  registerModels (): void {
    this.sequelize.addModels([
      Activity,
      ApiKey,
      Event,
      User,
    ])
  }
}

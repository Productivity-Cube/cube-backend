import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/user'
import { ApiKey } from '../models/apiKey'

export class Database {
  private readonly sequelize: Sequelize

  constructor (connectionInfo: string) {
    this.sequelize = new Sequelize(connectionInfo)
    this.registerModels()
  }

  registerModels (): void {
    this.sequelize.addModels([
      ApiKey,
      User,
    ])
  }
}

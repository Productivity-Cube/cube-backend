import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/user'

export class Database {
  private readonly sequelize: Sequelize

  constructor (connectionInfo: string) {
    this.sequelize = new Sequelize(connectionInfo)
    this.registerModels()
  }

  registerModels (): void {
    this.sequelize.addModels([
      User,
    ])
  }

  getConnection (): Sequelize {
    return this.sequelize
  }
}

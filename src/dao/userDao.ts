import { User } from '../models/user'
import { Database } from '../bootstrap/database'

export class UserDao {
  constructor (private readonly database: Database) {
  }

  async getByName (name: string): Promise<User | null> {
    return User.findOne({
      where: {
        name,
      }
    })
  }
}

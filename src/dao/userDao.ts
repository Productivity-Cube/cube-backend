import { User } from '../models/user'

export class UserDao {
  async getByName (name: string): Promise<User | null> {
    return User.findOne({
      where: {
        name,
      }
    })
  }
}

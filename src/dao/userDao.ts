import { User, UserModel } from '../models/user'
import * as _ from 'lodash'
import { UserNotFoundError } from '../errors/apiErrors'
import * as uuid from 'uuid'
import { ApiKeyDao } from './apiKeyDao'
import { Inject, Service } from 'typedi'

@Service()
export class UserDao {
  @Inject()
  private readonly apiKeyDao: ApiKeyDao

  constructor (
    apiKeyDao: ApiKeyDao
  ) {
    this.apiKeyDao = apiKeyDao
  }

  public async createUserWithKey (name: string): Promise<UserModel> {
    const user: User = await User.create({
      uuid: uuid.v4(),
      name,
    })

    return {
      ...user.toJSON(),
      apiKey: (await this.apiKeyDao.createForUser(user)).toJSON(),
    }
  }

  public async getByName (name: string): Promise<UserModel> {
    const user: User | null = await User.findOne({
      where: {
        name,
      }
    })

    if (_.isNull(user)) {
      // return {}
      throw new UserNotFoundError()
    }

    return user.toJSON()
  }
}

import { User, UserModel } from '../entity/user'
import * as _ from 'lodash'
import { UserNotFoundError } from '../errors/apiErrors'
import * as uuid from 'uuid'
import { ApiKeyRepository } from './apiKeyRepository'
import { Inject, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // constructor (
  //   @Inject() private readonly apiKeyRepository: ApiKeyRepository
  // ) {
  //   super()
  // }

  public async createUserWithKey (name: string): Promise<User> {
    const user: User = await this.save({
      uuid: uuid.v4(),
      name,
    })

    return {
      ...user,
      // apiKey: (await this.apiKeyDao.createForUser(user)),
    }
  }

  public async getByName (name: string): Promise<User> {
    const user: User | undefined = await this.findOne({
      where: {
        name,
      }
    })
    console.log('TUTAJ', user)

    if (_.isNull(user)) {
      throw new UserNotFoundError()
    }

    return <User> user
  }
}

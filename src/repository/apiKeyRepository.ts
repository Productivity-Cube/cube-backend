import { ApiKey, ApiKeyModel } from '../entity/apiKey'
import * as crypto from 'crypto'
import * as uuid from 'uuid'
import { Service } from 'typedi'
import { User } from '../entity/user'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Service()
export class ApiKeyRepository {
  constructor (@InjectRepository(ApiKey) private repository: Repository<ApiKey>) {
  }

  public async createForUser (user: User): Promise<ApiKey> {
    return this.repository.create({
      ...this.generateApiKeyObject(),
      user: user,
    })
  }

  private generateApiKeyObject (): ApiKeyModel {
    return {
      uuid: uuid.v4(),
      key: crypto
        .randomBytes(48)
        .toString('hex')
    }
  }

}

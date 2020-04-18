import { ApiKey, ApiKeyModel } from '../models/apiKey'
import * as crypto from 'crypto'
import * as uuid from 'uuid'
import { Service } from 'typedi'
import { User } from '../models/user'

@Service()
export class ApiKeyDao {
  public createForUser (user: User): Promise<ApiKey> {
    return ApiKey.create({
      ...this.generateApiKeyObject(),
      userId: user.uuid,
    })
  }

  private generateApiKeyObject (): ApiKeyModel {
    return {
      uuid: uuid.v4(),
      key: crypto.randomBytes(48).toString('hex')
    }
  }
}

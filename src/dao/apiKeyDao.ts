import { ApiKey, ApiKeyModel } from '../models/apiKey'
import * as crypto from 'crypto'
import * as uuid from 'uuid'
import { Service } from 'typedi'
import { User } from '../models/user'
import * as _ from 'lodash'
import { ApiKeyNotFoundError } from '../errors/apiErrors'

@Service()
export class ApiKeyDao {
  public async createForUser (user: User): Promise<ApiKey> {
    return ApiKey.create({
      ...this.generateApiKeyObject(),
      userId: user.uuid,
    })
  }

  public async findByKey (key: string): Promise<ApiKeyModel> {
    // tslint:disable-next-line:typedef
    const apiKey: ApiKey | null = await ApiKey.findOne({
      where: {
        key,
      },
      include: [User],
    })
    if (_.isNull(apiKey)) {
      throw new ApiKeyNotFoundError()
    }

    return apiKey.toJSON()
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

import * as uuid from 'uuid'
import { ApiKey } from '../../src/models/apiKey'

export const apiKeyMock: Partial<ApiKey> = {
  uuid: uuid.v4(),
  key: 'key',
}

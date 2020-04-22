import { User } from '../../src/models/user'
import * as uuid from 'uuid'

export const userMock: Partial<User> = {
  uuid: uuid.v4(),
  name: 'name',
}

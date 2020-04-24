import { Event } from '../../src/models/event'
import * as uuid from 'uuid'

export const eventMock: Partial<Event> = {
  uuid: uuid.v4(),
}

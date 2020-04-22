import { Activity } from '../../src/models/activity'
import * as uuid from 'uuid'

export const activityMock: Partial<Activity> = {
  uuid: uuid.v4(),
  name: 'Call',
}

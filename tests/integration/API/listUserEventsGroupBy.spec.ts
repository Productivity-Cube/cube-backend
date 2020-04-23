// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect, request, sinon } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { UserDao } from '../../../src/dao/userDao'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { UserModel } from '../../../src/models/user'
import { createEvent, listUserEvents, listUserEventsGroupBy, loginCall } from '../helpers/apiCalls'
import { EventDao } from '../../../src/dao/eventDao'
import { ActivityDao } from '../../../src/dao/activityDao'
import { EventModel } from '../../../src/models/event'
import { expectToBeAssignedToUser, expectWithoutDates } from '../helpers/asserts'
import { ActivityModel } from '../../../src/models/activity'

describe('GET /api/user/:userName/events/groupBy/:groupBy', () => {
  const apiKeyDao: ApiKeyDao = new ApiKeyDao()
  const activityDao: ActivityDao = new ActivityDao()
  const userDao: UserDao = new UserDao(apiKeyDao)
  const eventDao: EventDao = new EventDao(activityDao, userDao)
  const name: string = 'Wojciech'
  const name2: string = 'Zosia'

  let user: API.Login.Post.Response
  let user2: API.Login.Post.Response
  beforeEach(async () => {
    user = await loginCall(name, 200)
    user2 = await loginCall(name2, 200)

    await createEvent(name, 'Call')
    await createEvent(name, 'Call')
    await createEvent(name, 'Call')
    await createEvent(name, 'Break')
    await createEvent(name, 'Break')
    await createEvent(name, 'Planning')
    await createEvent(name2, 'Planning')
    await createEvent(name2, 'Call')
  })
  it('Should retrieve unfiltered user events ', async () => {
    const events: API.Events.Get.GroupBy.Response = await listUserEventsGroupBy(name, 'activity.name', {})

    expect(Object.keys(events)).to.be.length(3)
    expectToBeAssignedToUser(events.Call, name)
    expectToBeAssignedToUser(events.Break, name)
    expectToBeAssignedToUser(events.Planning, name)
  })
})

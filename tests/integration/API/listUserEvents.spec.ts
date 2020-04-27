// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { UserDao } from '../../../src/dao/userDao'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { createEvent, listUserEvents, loginCall } from '../helpers/apiCalls'
import { EventDao } from '../../../src/dao/eventDao'
import { ActivityDao } from '../../../src/dao/activityDao'
import { expectToBeAssignedToUser } from '../helpers/asserts'

describe('GET /api/user/:userName/events', () => {
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
    const events: API.Events.Get.Response = await listUserEvents(name, {})

    expect(events).to.be.length(6)
    expectToBeAssignedToUser(events, name)
  })
  it('Should retrieve user records for a specific activity', async () => {
    const events: API.Events.Get.Response = await listUserEvents(name, {
      activity: 'Call'
    })

    expect(events).to.be.length(3)
    expectToBeAssignedToUser(events, name)
  })
  it('Should retrieve user records between specific dates', async () => {
    const events: API.Events.Get.Response = await listUserEvents(name, {
      dateFrom: '12-02-2012',
      dateTo: '12-02-2112',
    })

    expect(events).to.be.length(6)
    expectToBeAssignedToUser(events, name)
  })
})

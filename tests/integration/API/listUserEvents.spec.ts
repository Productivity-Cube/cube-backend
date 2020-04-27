// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { createEvent, listUserEvents, loginCall } from '../helpers/apiCalls'
import { expectToBeAssignedToUser } from '../helpers/asserts'
import { ApiKeyModel } from '../../../src/models/apiKey'
import GroupByOptions = API.Events.Get.GroupByOptions

// tslint:disable-next-line:max-func-body-length
describe('GET /api/user/:userName/events', () => {
  const name: string = 'Wojciech'
  const name2: string = 'Zosia'

  let user: API.Login.Post.Response
  let user2: API.Login.Post.Response
  beforeEach(async () => {
    user = await loginCall(name, 200)
    user2 = await loginCall(name2, 200)

    await createEvent(<ApiKeyModel> user.apiKey, name, 'Call', 1)
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Call', 1)
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Call', 1)
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Break', 2)
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Break')
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Planning')
    await createEvent(<ApiKeyModel> user2.apiKey, name2, 'Planning')
    await createEvent(<ApiKeyModel> user2.apiKey, name2, 'Call')
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
  it('Should retrieve user records for a specific productivity rate', async () => {
    const events: API.Events.Get.Response = await listUserEvents(name, {
      productivityRate: 1
    })

    expect(events).to.be.length(3)
    expectToBeAssignedToUser(events, name)
  })
  it('Should retrieve user records grouped by activity', async () => {
    const events: API.Events.Get.Response = await listUserEvents(name, {
      groupBy: GroupByOptions.activityId
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

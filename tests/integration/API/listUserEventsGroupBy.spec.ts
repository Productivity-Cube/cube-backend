// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { createEvent, listUserEventsGroupBy, loginCall } from '../helpers/apiCalls'
import { expectToBeAssignedToUser } from '../helpers/asserts'
import { ApiKeyModel } from '../../../src/models/apiKey'

describe('GET /api/user/:userName/events/groupBy/:groupBy', () => {
  const name: string = 'Wojciech'
  const name2: string = 'Zosia'

  let user: API.Login.Post.Response
  let user2: API.Login.Post.Response
  beforeEach(async () => {
    user = await loginCall(name, 200)
    user2 = await loginCall(name2, 200)

    await createEvent(<ApiKeyModel> user.apiKey, name, 'Call')
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Call')
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Call')
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Break')
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Break')
    await createEvent(<ApiKeyModel> user.apiKey, name, 'Planning')
    await createEvent(<ApiKeyModel> user2.apiKey, name2, 'Planning')
    await createEvent(<ApiKeyModel> user2.apiKey, name2, 'Call')
  })
  it('Should retrieve unfiltered user events ', async () => {
    const events: API.Events.Get.GroupBy.Response = await listUserEventsGroupBy(name, 'activity.name', {})

    expect(Object.keys(events)).to.be.length(3)
    expectToBeAssignedToUser(events.Call, name)
    expectToBeAssignedToUser(events.Break, name)
    expectToBeAssignedToUser(events.Planning, name)
  })
})

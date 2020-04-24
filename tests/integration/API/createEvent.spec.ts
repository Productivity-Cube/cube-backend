// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect, request, sinon } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { UserDao } from '../../../src/dao/userDao'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { UserModel } from '../../../src/models/user'
import { createEvent, loginCall } from '../helpers/apiCalls'
import { EventDao } from '../../../src/dao/eventDao'
import { ActivityDao } from '../../../src/dao/activityDao'
import { EventModel } from '../../../src/models/event'
import { expectWithoutDates } from '../helpers/asserts'
import { ActivityModel } from '../../../src/models/activity'

describe('POST /api/events', () => {
  const apiKeyDao: ApiKeyDao = new ApiKeyDao()
  const activityDao: ActivityDao = new ActivityDao()
  const userDao: UserDao = new UserDao(apiKeyDao)
  const eventDao: EventDao = new EventDao(activityDao, userDao)
  const name: string = 'Wojciech'
  const activityName: string = 'Call'

  let user: API.Login.Post.Response
  let activity: ActivityModel
  beforeEach(async () => {
    user = await loginCall(name, 200)
    activity = await activityDao.getByName(activityName)
  })
  it('When user tries to login for first time it should return newly created user with api key', async () => {
    const event: API.Events.Post.Response = await createEvent(name, activityName)

    expectWithoutDates(<UserModel> event.user, user)
    expectWithoutDates(<ActivityModel> event.activity, activity)
    expect(event.uuid).not.to.be.null
  })

  it('When activity is not found it should throw an error', async () => {
    const event: API.Error = <API.Error> await createEvent(name, 'wrong activity', undefined, 500)

    expect(event.name).to.equal('ActivityNotFoundError')
  })
  it('When user is not found it should throw an error', async () => {
    const event: API.Error = <API.Error> await createEvent('wrong name', activityName, undefined, 500)

    expect(event.name).to.equal('UserNotFoundError')
  })
})

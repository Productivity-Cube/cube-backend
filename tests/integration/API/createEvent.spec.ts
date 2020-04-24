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
import { ApiKeyModel } from '../../../src/models/apiKey'

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
    const event: API.Events.Post.Response = await createEvent(<ApiKeyModel> user.apiKey, name, activityName)

    expectWithoutDates(<UserModel> event.user, user)
    expectWithoutDates(<ActivityModel> event.activity, activity)
    expect(event.uuid).not.to.be.null
  })

  it('When activity is not found it should throw an error', async () => {
    const event: API.Error = <API.Error> await createEvent(
      <ApiKeyModel> user.apiKey,
      name,
      'wrong activity',
      undefined,
      404)

    expect(event.name).to.equal('ActivityNotFoundError')
  })
  it('Should throw unauthorized error when user is not found', async () => {
    const event: API.Error = <API.Error> await createEvent(
      <ApiKeyModel> user.apiKey,
      'wrong name',
      activityName,
      undefined,
      401)
  })
  it('Should throw unauthorized error when key is wrong', async () => {
    const event: API.Error = <API.Error> await createEvent(
      { ...user.apiKey, key: 'wrong key' },
      name,
      activityName,
      undefined,
      401)
  })
  it('Should throw unauthorized error when header bearer is not sent', async () => {
    const response: { body: Object } = await request
      .post('/api/events')
      .set('Accept', 'application/json')
      .send({
        activity,
        user,
      })
      .expect(401)
  })
})

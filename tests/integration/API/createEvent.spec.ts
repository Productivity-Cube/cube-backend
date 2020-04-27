// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect, request } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { UserModel } from '../../../src/models/user'
import { createEvent, loginCall } from '../helpers/apiCalls'
import { ActivityDao } from '../../../src/dao/activityDao'
import { expectWithoutDates } from '../helpers/asserts'
import { ActivityModel } from '../../../src/models/activity'
import { ApiKeyModel } from '../../../src/models/apiKey'

// tslint:disable-next-line:max-func-body-length
describe('POST /api/events', () => {
  const activityDao: ActivityDao = new ActivityDao()
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
    await createEvent(
      <ApiKeyModel> user.apiKey,
      'wrong name',
      activityName,
      undefined,
      401)
  })
  it('Should throw unauthorized error when key is wrong', async () => {
    await createEvent(
      { ...user.apiKey, key: 'wrong key' },
      name,
      activityName,
      undefined,
      401)
  })
  it('Should throw unauthorized error when header bearer is not sent', async () => {
    await request
      .post('/api/events')
      .set('Accept', 'application/json')
      .send({
        activity,
        user,
      })
      .expect(401)
  })
})

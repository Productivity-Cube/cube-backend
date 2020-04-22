// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect, request, sinon } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { UserDao } from '../../../src/dao/userDao'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { UserModel } from '../../../src/models/user'
import { loginCall } from '../helpers/apiCalls'

describe('POST /api/login', () => {
  const apiKeyDao: ApiKeyDao = new ApiKeyDao()
  const userDao: UserDao = new UserDao(apiKeyDao)
  const name: string = 'Wojciech'
  it('When user tries to login for first time it should return newly created user with api key', async () => {
    const body: API.Login.Post.Response = await loginCall(name, 200)
    const user: UserModel = await userDao.getByName(name)

    expect(body).to.deep.include({
      uuid: user.uuid,
      name: user.name,
    })
    expect(body.apiKey).to.haveOwnProperty('uuid')
    expect(body.apiKey).to.haveOwnProperty('key')
  })
  it('When user tries to login for second time it should return user record without api key', async () => {
    // first call
    await loginCall(name, 200)
    // second call
    const body: API.Login.Post.Response = await loginCall(name, 200)
    const user: UserModel = await userDao.getByName(name)

    expect(body).to.deep.include({
      uuid: user.uuid,
      name: user.name,
    })
    expect(body).not.to.haveOwnProperty('apiKey')
  })
  it('Should throw validation error when the name is too short', async () => {
    const body: API.ValidationErrorResponse = <API.ValidationErrorResponse> (await loginCall<API.ValidationErrorResponse>('a', 400))
    expect(body.errors).to.deep.equal([{
      target: { name: 'a' },
      value: 'a',
      property: 'name',
      children: [],
      constraints:
        { minLength: 'name must be longer than or equal to 3 characters' }
    }])
  })
})

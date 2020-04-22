import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { ApiKey } from '../../../src/models/apiKey'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { userMock } from '../../mocks/User'
import { apiKeyMock } from '../../mocks/ApiKey'
import { User } from '../../../src/models/user'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression

describe('#ApiKeyDao', () => {
  const apiKeyDao: ApiKeyDao = new ApiKeyDao()
  describe('createForUser', () => {
    const createStub: SinonStub = sinon.stub(ApiKey, 'create')

    it('Should call create function and return data', async () => {
      createStub.resolves(apiKeyMock)
      expect(await apiKeyDao.createForUser(<User> userMock)).to.equal(apiKeyMock)
      expect(createStub).to.be.calledWith({
        key: sinon.match.any,
        uuid: sinon.match.any,
        userId: userMock.uuid,
      })
    })
  })
})

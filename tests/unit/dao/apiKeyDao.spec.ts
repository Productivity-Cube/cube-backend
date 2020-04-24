import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { ApiKey } from '../../../src/models/apiKey'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { userMock } from '../../mocks/User'
import { apiKeyMock } from '../../mocks/ApiKey'
import { User } from '../../../src/models/user'
import { ModelMock } from '../../mocks/Model'
import { ApiKeyNotFoundError } from '../../../src/errors/apiErrors'
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
  describe('findByKey', () => {
    const findOneStub: SinonStub = sinon.stub(ApiKey, 'findOne')
    it('Should retrieve an API key if it is found in the database', async () => {
      findOneStub.resolves(new ModelMock(apiKeyMock))
      expect(await apiKeyDao.findByKey('key')).to.equal(apiKeyMock)
      expect(findOneStub).to.be.calledWith({
        where: {
          key: 'key',
        },
        include: [User],
      })
    })
    it('Should throw error if the API key was not found', async () => {
      // tslint:disable-next-line:no-null-keyword
      findOneStub.resolves(null)
      await expect(apiKeyDao.findByKey('key')).to.eventually.be.rejectedWith(ApiKeyNotFoundError)
    })
  })
})

import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { UserDao } from '../../../src/dao/userDao'
import { userMock } from '../../mocks/User'
import { apiKeyMock } from '../../mocks/ApiKey'
import { User } from '../../../src/models/user'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { ModelMock } from '../../mocks/Model'
import { UserNotFoundError } from '../../../src/errors/apiErrors'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-null-keyword max-func-body-length

describe('#UserDao', () => {
  const createForUserStub: SinonStub = sinon.stub().resolves(new ModelMock(apiKeyMock))
  const apiKeyDaoMock: Partial<ApiKeyDao> = {
    createForUser: createForUserStub
  }
  const userDao: UserDao = new UserDao(<ApiKeyDao> apiKeyDaoMock)

  describe('createUserWithKey', () => {
    const createStub: SinonStub = sinon.stub(User, 'create')

    it('Should call create function and return data with apiKey', async () => {
      createStub.resolves(new ModelMock(userMock))
      expect(await userDao.createUserWithKey('name')).to.deep.equal({
        ...userMock,
        apiKey: apiKeyMock,
      })

      expect(createStub).to.be.calledWith({
        ...userMock,
        uuid: sinon.match.any,
      })
      expect(createForUserStub).to.be.calledWith(new ModelMock(userMock))
    })
  })

  describe('getByName', () => {
    const findOneStub: SinonStub = sinon.stub(User, 'findOne')

    it('When the record is found in the DB it should return an Object', async () => {
      findOneStub.resolves(new ModelMock(userMock))
      expect(await userDao.getByName('name')).to.deep.equal(userMock)

      expect(findOneStub).to.be.calledWith({
        where: {
          name: 'name',
        }
      })
    })

    it('When the record is not found in the DB it should throw UserNotFoundError error', async () => {
      findOneStub.resolves(null)
      await expect(userDao.getByName('name')).to.eventually.be.rejectedWith(UserNotFoundError)

      expect(findOneStub).to.be.calledWith({
        where: {
          name: 'name',
        }
      })
    })
  })
})

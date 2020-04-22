import { expect, sinon } from '../setup'
import { UserDao } from '../../../src/dao/userDao'
import { LoginController } from '../../../src/controllers/loginController'
import { SinonStub } from 'sinon'

// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression

describe('#loginController', () => {
  describe('index', () => {
    const getByNameStub: SinonStub = sinon.stub().resolves('getByNameStub')
    const createUserWithKeyStub: SinonStub = sinon.stub().resolves('createUserWithKeyStub')

    const userDaoMock: Partial<UserDao> = {
      getByName: getByNameStub,
      createUserWithKey: createUserWithKeyStub,
    }
    it('Should call getByName method from reporistory and return its data', async () => {
      const loginController: LoginController = new LoginController(<UserDao> userDaoMock)

      expect(await loginController.index({ name: 'name' })).to.equal('getByNameStub')
      expect(userDaoMock.getByName).to.be.called
      expect(userDaoMock.createUserWithKey).not.to.be.called
    })

    it('Should call createUserWithKey when getByName fails', async () => {
      getByNameStub.throws()
      const loginController: LoginController = new LoginController(<UserDao> userDaoMock)

      expect(await loginController.index({ name: 'name' })).to.equal('createUserWithKeyStub')
      expect(userDaoMock.getByName).to.be.called
      expect(userDaoMock.createUserWithKey).to.be.called
    })
  })
})

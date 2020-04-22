import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { ActivityDao } from '../../../src/dao/activityDao'
import { Activity } from '../../../src/models/activity'
import { activityMock } from '../../mocks/Activity'
import { ModelMock } from '../../mocks/Model'
import { ActivityNotFoundError } from '../../../src/errors/apiErrors'
import { EventDao } from '../../../src/dao/eventDao'
import { apiKeyMock } from '../../mocks/ApiKey'
import { ApiKeyDao } from '../../../src/dao/apiKeyDao'
import { userMock } from '../../mocks/User'
import { UserDao } from '../../../src/dao/userDao'
import { Event } from '../../../src/models/event'
import { eventMock } from '../../mocks/Event'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-null-keyword

describe('#EventDao', () => {
  const activityGetByNameStub: SinonStub = sinon.stub().resolves(activityMock)
  const activityDaoMock: Partial<ActivityDao> = {
    getByName: activityGetByNameStub
  }
  const userGetByNameStub: SinonStub = sinon.stub().resolves(userMock)
  const userDaoMock: Partial<UserDao> = {
    getByName: userGetByNameStub
  }

  const eventDao: EventDao = new EventDao(<ActivityDao> activityDaoMock, <UserDao> userDaoMock)
  describe('create', () => {
    const createStub: SinonStub = sinon.stub(Event, 'create')
    const findOneStub: SinonStub = sinon.stub(Event, 'findOne')

    it('Should save event for the user and activity', async () => {
      createStub.resolves(new ModelMock(eventMock))
      findOneStub.resolves(new ModelMock(eventMock))
      expect(await eventDao.create('userName', 'Call')).to.equal(eventMock)
      expect(createStub).to.be.calledWith({
        uuid: sinon.match.any,
        name: 'userName',
        productivityRate: undefined,
        userId: userMock.uuid,
        activityId: activityMock.uuid
      })
    })
  })
})

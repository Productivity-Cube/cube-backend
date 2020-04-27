import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { ActivityDao } from '../../../src/dao/activityDao'
import { activityMock } from '../../mocks/Activity'
import { ModelMock } from '../../mocks/Model'
import { EventDao } from '../../../src/dao/eventDao'
import { userMock } from '../../mocks/User'
import { UserDao } from '../../../src/dao/userDao'
import { Event } from '../../../src/models/event'
import { eventMock } from '../../mocks/Event'
import * as Sequelize from 'sequelize'
import { API } from '../../../src/publicInterfaces'
import GroupByOptions = API.Events.Get.GroupByOptions
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-null-keyword max-func-body-length no-big-function

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
    it('Should save event for the user and activity with productivity rate', async () => {
      createStub.resolves(new ModelMock(eventMock))
      findOneStub.resolves(new ModelMock(eventMock))
      expect(await eventDao.create('userName', 'Call', 1)).to.equal(eventMock)
      expect(createStub).to.be.calledWith({
        uuid: sinon.match.any,
        name: 'userName',
        productivityRate: 1,
        userId: userMock.uuid,
        activityId: activityMock.uuid
      })
    })

    it('Should not throw error if this is a first saved record', async () => {
      findOneStub.reset()
      createStub.resolves(new ModelMock(eventMock))
      findOneStub.onCall(0).resolves(null)
      findOneStub.onCall(1).resolves(new ModelMock(eventMock))
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

  describe('find', () => {
    const findAllStub: SinonStub = sinon.stub(Event, 'findAll')
    findAllStub.resolves([new ModelMock(eventMock)])

    it('Should retrieve all data for user', async () => {
      expect(await eventDao.find('userName', {})).to.deep.equal([eventMock])
      expect(findAllStub.lastCall.args[0].include[0].where).to.deep.equal({})
      expect(findAllStub.lastCall.args[0].include[1].where).to.deep.equal({ name: 'userName' })
    })

    it('Should be able to filter by activity name', async () => {
      expect(await eventDao.find('userName', {
        activity: 'activity',
      })).to.deep.equal([eventMock])
      expect(findAllStub.lastCall.args[0].include[0].where).to.deep.equal({ name: 'activity' })
      expect(findAllStub.lastCall.args[0].include[1].where).to.deep.equal({ name: 'userName' })
    })

    it('Should be able to filter by productivity rate', async () => {
      expect(await eventDao.find('userName', {
        productivityRate: '1',
      })).to.deep.equal([eventMock])
    })

    it('Should be able to group by parameter', async () => {
      expect(await eventDao.find('userName', {
        groupBy: GroupByOptions.activityId,
      })).to.deep.equal([eventMock])
    })

    it('Should be able to filter by date from', async () => {
      expect(await eventDao.find('userName', {
        dateFrom: '12-10-2012',
      })).to.deep.equal([eventMock])
      expect(findAllStub.lastCall.args[0].where).to.deep.equal({
        createdAt: {
          [Sequelize.Op.gte]: '2012-12-09T23:00:00.000Z',
        },
      })
      expect(findAllStub.lastCall.args[0].include[0].where).to.deep.equal({})
      expect(findAllStub.lastCall.args[0].include[1].where).to.deep.equal({ name: 'userName' })
    })
    it('Should be able to filter by date to', async () => {
      expect(await eventDao.find('userName', {
        dateTo: '12-10-2012',
      })).to.deep.equal([eventMock])
      expect(findAllStub.lastCall.args[0].where).to.deep.equal({
        createdAt: {
          [Sequelize.Op.lte]: '2012-12-09T23:00:00.000Z',
        },
      })
      expect(findAllStub.lastCall.args[0].include[0].where).to.deep.equal({})
      expect(findAllStub.lastCall.args[0].include[1].where).to.deep.equal({ name: 'userName' })
    })
  })
})

import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { EventDao } from '../../../src/dao/eventDao'
import { EventController } from '../../../src/controllers/eventController'
import { eventMock } from '../../mocks/Event'

// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-duplicate-string
// tslint:disable-next-line:max-func-body-length
describe('#eventController', () => {
  const createStub: SinonStub = sinon.stub().resolves('createStub')
  const findStub: SinonStub = sinon.stub().resolves('findStub')

  const eventDaoMock: Partial<EventDao> = {
    create: createStub,
    find: findStub,
  }
  const eventController: EventController = new EventController(<EventDao> eventDaoMock)
  describe('index', () => {
    it('Should call create method from reporistory and return its data', async () => {

      expect(await eventController.index({
        activity: 'activity',
        user: 'name',
      })).to.equal('createStub')
      expect(eventDaoMock.create).to.be.called
    })
  })

  describe('list', () => {
    it('Should return data retrieved from repository', async () => {
      expect(await eventController.list(
        { userName: 'userName' },
        { activity: 'activity' },
      )).to.equal('findStub')
      expect(findStub).to.be.calledWith('userName', { activity: 'activity' })
    })
  })

  describe('groupBy', () => {
    it('Should return data retrieved from repository grouped by selected field', async () => {
      findStub.resolves([
        { ...eventMock, activityId: '1' },
        { ...eventMock, activityId: '2' },
        { ...eventMock, activityId: '3' },
        { ...eventMock, activityId: '1' },
      ])

      expect(await eventController.groupBy(
        { userName: 'userName', groupBy: 'activityId' },
        { activity: 'activity' },
      )).to.deep.equal({
        1: [{
          uuid: eventMock.uuid,
          activityId: '1'
        }, {
          uuid: eventMock.uuid,
          activityId: '1'
        }],
        2: [{
          uuid: eventMock.uuid,
          activityId: '2'
        }],
        3: [{
          uuid: eventMock.uuid,
          activityId: '3'
        }],
      })
      expect(findStub).to.be.calledWith('userName', { activity: 'activity' })
    })
  })
})

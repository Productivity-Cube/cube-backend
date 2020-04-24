import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { EventDao } from '../../../src/dao/eventDao'
import { EventController } from '../../../src/controllers/eventController'

// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression

describe('#eventController', () => {
  describe('index', () => {
    const createStub: SinonStub = sinon.stub().resolves('createStub')

    const eventDaoMock: Partial<EventDao> = {
      create: createStub,
    }
    it('Should call create method from reporistory and return its data', async () => {
      const eventController: EventController = new EventController(<EventDao> eventDaoMock)

      expect(await eventController.index({
        activity: 'activity',
        user: 'name',
      })).to.equal('createStub')
      expect(eventDaoMock.create).to.be.called
    })
  })
})

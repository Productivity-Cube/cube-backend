import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { ActivityDao } from '../../../src/dao/activityDao'
import { Activity } from '../../../src/models/activity'
import { activityMock } from '../../mocks/Activity'
import { ModelMock } from '../../mocks/Model'
import { ActivityNotFoundError } from '../../../src/errors/apiErrors'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-null-keyword

describe('#ActivityDao', () => {
  const activityDao: ActivityDao = new ActivityDao()
  describe('getByName', () => {
    const findOneStub: SinonStub = sinon.stub(Activity, 'findOne')

    it('Should return activity data if the record has been found', async () => {
      findOneStub.resolves(new ModelMock(activityMock))
      expect(await activityDao.getByName('Call')).to.equal(activityMock)
      expect(findOneStub).to.be.calledWith({
        where: {
          name: 'Call',
        }
      })
    })

    it('Should throw ActivityNotFoundError if the record has not been found', async () => {
      findOneStub.resolves(null)
      await expect(activityDao.getByName('Netflix')).to.eventually.be.rejectedWith(ActivityNotFoundError)
      expect(findOneStub).to.be.calledWith({
        where: {
          name: 'Call',
        }
      })
    })
  })
})

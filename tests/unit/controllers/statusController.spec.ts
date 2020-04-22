import { expect } from '../setup'
import { StatusController } from '../../../src/controllers/statusController'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression

describe('#statusController', () => {
  describe('index', () => {
    it('Should call getByName method from reporistory and return its data', async () => {
      const statusController: StatusController = new StatusController()

      expect(await statusController.index()).to.deep.equal({
        status: 'ok'
      })
    })
  })
})

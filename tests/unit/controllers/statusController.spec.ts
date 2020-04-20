import { expect, sinon } from '../setup'
import { SinonStub } from 'sinon'
import { Response } from 'express'
import { StatusController } from '../../../src/controllers/statusController'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression

describe('#statusController', () => {
  describe('index', () => {
    const sendStub: SinonStub = sinon.stub().resolves('resStub')

    const responseMock: Partial<Response> = {
      send: sendStub,
    }
    it('Should call getByName method from reporistory and return its data', async () => {
      const statusController: StatusController = new StatusController()

      expect(await statusController.index(<Response> responseMock)).to.equal('resStub')
      expect(responseMock.send).to.be.called
    })
  })
})

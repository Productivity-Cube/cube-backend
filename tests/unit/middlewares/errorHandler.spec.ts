import { ErrorHandler } from '../../../src/middlewares/errorHandler'
import { expect, sinon } from '../setup'
import { mockReq, mockRes } from 'sinon-express-mock'
import { ActivityNotFoundError } from '../../../src/errors/apiErrors'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-null-keyword

describe('#ErrorHandler', () => {
  describe('error', () => {
    const errorHandler: ErrorHandler = new ErrorHandler()
    const sendStub: sinon.SinonStub = sinon.stub()
    const nextStub: sinon.SinonStub = sinon.stub()
    const req = mockReq()
    const res = mockRes({
      send: sendStub,
    })
    it('Should compose and return httpError from an oridinary error', () => {

      errorHandler.error(new ActivityNotFoundError(), req, res, nextStub)
      expect(nextStub).not.to.be.called
      expect(sendStub).to.be.calledWith({
        httpCode: 404,
        name: 'ActivityNotFoundError',
        message: 'Activity not found',
        errors: undefined,
      })
    })
    it('Should pass errors array', () => {
      errorHandler.error({
        httpCode: 500,
        message: 'message',
        errors: [{ error: 'validation error ' }]
      }, req, res, nextStub)
      expect(nextStub).not.to.be.called
      expect(sendStub).to.be.calledWith({
        name: 'Object',
        httpCode: 500,
        message: 'message',
        errors: [{ error: 'validation error ' }]
      })
    })
  })
})

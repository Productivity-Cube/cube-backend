// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { expect } from '../setup'
import { API } from '../../../src/publicInterfaces'
import { statusCall } from '../helpers/apiCalls'

describe('GET /api/', () => {
  it('Status of the service should be ok', async () => {
    const body: API.Status.Get.Response = await statusCall()
    expect(body).to.deep.equal({
      status: 'ok'
    })
  })
})

import * as chai from 'chai'
import * as asPromised from 'chai-as-promised'

import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { initService } from '../../src'
import * as supertest from 'supertest'
import { User } from '../../src/models/user'
import { ApiKey } from '../../src/models/apiKey'

// tslint:disable:no-require-imports no-var-requires
chai.use(require('chai-json-schema'));
chai.use(require('chai-deep-match'))
chai.use(require('chai-exclude'))
chai.use(sinonChai)
chai.use(asPromised)

const expect: Chai.ExpectStatic = chai.expect

let request: supertest.SuperTest<supertest.Test>

async function truncateTables (): Promise<void> {
  await User.destroy({ truncate: true, force: true })
  await ApiKey.destroy({ truncate: true, force: true })
}

before((): void => {
  const app: Object = initService()
  request = supertest(app)
})

beforeEach(async (): Promise<void> => {
  await truncateTables()
})

export {
  sinon,
  expect,
  request,
  truncateTables
}

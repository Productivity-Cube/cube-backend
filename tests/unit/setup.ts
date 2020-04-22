import * as chai from 'chai';
import * as asPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

// tslint:disable:no-require-imports no-var-requires
chai.use(require('chai-json-schema'));
chai.use(require('chai-deep-match'))
chai.use(sinonChai)
chai.use(asPromised)

export { sinon as sinon }
export const expect: Chai.ExpectStatic = chai.expect

process.env.DATABASE_CONNECTION_URL = 'Unit tests should not connect to the DB'

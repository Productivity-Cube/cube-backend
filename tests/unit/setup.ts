import * as chai from 'chai';
import * as asPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)
chai.use(asPromised)

export { sinon as sinon }
export const expect: Chai.ExpectStatic = chai.expect

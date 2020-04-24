import { expect } from '../setup'
import * as _ from 'lodash'

export function expectWithoutDates (data: Object, expectedResult: Object): void {
  const omit: string[] = ['createdAt', 'updatedAt', 'apiKey']
  expect(_.omit(data, omit)).to.deep.equal(_.omit(expectedResult, omit))
}

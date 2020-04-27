import { expect } from '../setup'
import * as _ from 'lodash'
import { EventModel } from '../../../src/models/event'

export function expectWithoutDates (data: Object, expectedResult: Object): void {
  const omit: string[] = ['createdAt', 'updatedAt', 'apiKey']
  // tslint:disable-next-line:newline-per-chained-call
  expect(_.omit(data, omit)).to.deep.equal(_.omit(expectedResult, omit))
}

export function expectToBeAssignedToUser (events: EventModel[], userName: string): void {
  // tslint:disable-next-line:no-non-null-assertion newline-per-chained-call
  expect(events.filter((event: EventModel): boolean => event.user!.name === userName)).to.be.length(events.length)
}

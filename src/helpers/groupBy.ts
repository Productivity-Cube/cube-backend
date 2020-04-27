import * as _ from 'lodash'

// tslint:disable-next-line:typedef
const groupBy = (key: string) => (array: Object[]) =>
  array.reduce((objectsByKeyValue: Object, obj: Object): Object => {
    const value: string = _.get(obj, key)
    _.set(objectsByKeyValue, value, (_.get(objectsByKeyValue, value, [])).concat(obj))

    return objectsByKeyValue
  }, {})

export function groupByField<T> (field: string, arrayToGroup: T[]): { [key: string]: T[] } {
  // tslint:disable-next-line:no-shadowed-variable
  const groupByField: Function = groupBy(field)

  return groupByField(arrayToGroup)
}

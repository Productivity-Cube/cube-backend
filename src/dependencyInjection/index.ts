import { DependencyInjection } from './dependencyInjection'
import { Database } from '../bootstrap/database'
import { DATABASE_CONNECTION_URL } from '../config'

export function registerDependencyInjection (): DependencyInjection {
  const dependencyInjection: DependencyInjection = new DependencyInjection()

  dependencyInjection.addService('db', new Database(DATABASE_CONNECTION_URL))

  return dependencyInjection
}

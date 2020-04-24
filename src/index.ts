// tslint:disable:no-import-side-effect prefer-template
import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { Database } from './bootstrap/database'
import { DATABASE_CONNECTION_URL } from './config'
import * as cors from 'cors'

let app: { listen: Function; options: Function }

export function initService (): Object {
  if (app !== undefined) {
    return app
  }

  useContainer(Container)

  // tslint:disable-next-line:no-unused-expression
  new Database(DATABASE_CONNECTION_URL)

  app = createExpressServer({
    cors: true,
    validation: true,
    routePrefix: '/api',
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: [__dirname + '/middlewares/*.ts'],
    interceptors: [__dirname + '/interceptors/*.ts'],
  })

  app.options(false, cors())

  app.listen(8000)

  return app
}

initService()

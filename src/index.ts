// tslint:disable:no-import-side-effect prefer-template
import 'reflect-metadata'
import { Action, createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { Database } from './bootstrap/database'
import { DATABASE_CONNECTION_URL } from './config'
import * as cors from 'cors'
import { ApiKeyDao } from './dao/apiKeyDao'
import { ApiKeyModel } from './models/apiKey'
import { UserModel } from './models/user'
import * as _ from 'lodash'

let app: { listen: Function; options: Function; use: Function }

export function initService (): Object {
  if (!_.isUndefined(app)) {
    return app
  }

  useContainer(Container)

  // tslint:disable-next-line:no-unused-expression
  new Database(DATABASE_CONNECTION_URL)

  app = createExpressServer({
    authorizationChecker: async (action: Action): Promise<boolean> => {
      const token: string = action.request.headers.authorization?.substr(7)

      try {
        const apiKey: ApiKeyModel = await (new ApiKeyDao()).findByKey(token)
        if ((<UserModel> apiKey.user).name !== action.request.body.user) {
          return false
        }
      } catch (error) {
        return false
      }

      return true
    },
    defaultErrorHandler: false,
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

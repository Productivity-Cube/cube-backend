// tslint:disable:no-import-side-effect prefer-template
import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { Database } from './bootstrap/database'
import { DATABASE_CONNECTION_URL } from './config'

useContainer(Container)

// tslint:disable-next-line:no-unused-expression
new Database(DATABASE_CONNECTION_URL)

const app: { listen: Function } = createExpressServer({
  controllers: [__dirname + '/controllers/*.ts'],
  middlewares: [__dirname + '/middlewares/*.ts'],
  interceptors: [__dirname + '/interceptors/*.ts'],
})

app.listen(8000)

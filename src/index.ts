// tslint:disable:no-import-side-effect prefer-template
import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import { Container } from 'typedi'
import { createConnection, useContainer } from 'typeorm'

useContainer(Container)
createConnection({
  'type': 'mysql',
  'host': 'localhost',
  'port': 3306,
  'username': 'root',
  'password': 'root',
  'database': 'cube'
})

const app: { listen: Function } = createExpressServer({
  validation: true,
  routePrefix: '/api',
  controllers: [__dirname + '/controllers/*.ts'],
  middlewares: [__dirname + '/middlewares/*.ts'],
  interceptors: [__dirname + '/interceptors/*.ts'],
})

app.listen(8000)

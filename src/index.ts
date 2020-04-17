// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'

import { EventController } from './controllers/eventController'
import { registerDependencyInjection } from './dependencyInjection'
import { DependencyInjection } from './dependencyInjection/dependencyInjection'
import { StatusController } from './controllers/statusController'

export const DI: DependencyInjection = registerDependencyInjection()

const app: { listen: Function } = createExpressServer({
  controllers: [
    EventController,
    StatusController,
  ]
})

app.listen(8000)

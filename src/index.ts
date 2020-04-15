
import * as dotenv from 'dotenv'

dotenv.config()

import { initService } from './app';

initService()
.then(() => {
  console.log('Running server')
})
.catch((err: Error) => {
  console.log(err)
})


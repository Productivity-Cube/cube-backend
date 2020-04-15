
import * as express from 'express'
import * as http from 'http'
import { AddressInfo } from 'net'

export async function initService (): Promise<express.Application> {
  const app: express.Application = express()

  const inst: http.Server = app.listen(8000, () => {
    const address: string | AddressInfo | null = inst.address()
    console.log('running', {
      address: address === null ? '<NULL>' : address,
    })
  })

  return app

}

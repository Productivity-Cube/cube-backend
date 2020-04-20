import { Controller, Get, Res } from 'routing-controllers'
import { Response } from 'express'

@Controller()
export class StatusController {

  @Get('/')
  async get (@Res() response: Response): Promise<Response> {
    return response.send('ok')
  }
}

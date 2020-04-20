import { Controller, Get, Res } from 'routing-controllers'
import { Response } from 'express'

@Controller()
export class StatusController {

  @Get('/')
  async index (@Res() response: Response): Promise<Response> {
    return response.send('ok')
  }
}

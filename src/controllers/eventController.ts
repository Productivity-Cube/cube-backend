import { Controller, Get } from 'routing-controllers'
import { User } from '../models/user'

@Controller()
export class EventController {

  @Get('/events')
  async getAll (): Promise<string> {
    return JSON.stringify(
      await User.findAll()
    )
  }
}

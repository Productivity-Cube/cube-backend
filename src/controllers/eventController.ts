import { Controller, Get } from 'routing-controllers'
import { UserDao } from '../dao/userDao'

@Controller()
export class EventController {
  constructor (
    private readonly userDao: UserDao,
    ) {
  }

  @Get('/events')
  // tslint:disable-next-line:no-any
  async getAll (): Promise<any> {
    return JSON.stringify(await this.userDao.getByName('user1'))
  }
}

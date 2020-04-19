import { Controller, Get } from 'routing-controllers'
import { UserRepository } from '../repository/userRepository'

@Controller()
export class EventController {
  constructor (
    private readonly userRepository: UserRepository,
    ) {
  }

  @Get('/events')
  // tslint:disable-next-line:no-any
  async getAll (): Promise<any> {
    return JSON.stringify(await this.userRepository.getByName('user1'))
  }
}

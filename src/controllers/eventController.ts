import { Body, JsonController, Post } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { UserDao } from '../dao/userDao'
import { EventDao } from '../dao/eventDao'

@JsonController()
export class EventController {
  constructor (
    private readonly eventDao: EventDao,
  ) {
  }

  @Post('/event')
  async index (@Body() body: API.Event.Post.Body): Promise<API.Event.Post.Response> {
    return this.eventDao.create(body.user, body.activity, body.productivityRate)
  }
}

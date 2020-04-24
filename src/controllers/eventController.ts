import { Body, JsonController, Post } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { EventDao } from '../dao/eventDao'

@JsonController()
export class EventController {
  constructor (
    private readonly eventDao: EventDao,
  ) {
  }

  @Post('/events')
  async index (@Body() body: API.Events.Post.Body): Promise<API.Events.Post.Response> {
    return this.eventDao.create(body.user, body.activity, body.productivityRate)
  }
}

import { Body, Get, JsonController, Params, Post, QueryParams } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { EventDao } from '../dao/eventDao'
import { EventModel } from '../models/event'
import { groupByField } from '../helpers/groupBy'

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

  @Get('/user/:userName/events')
  async list (
    @Params() params: API.Events.Get.Params,
    @QueryParams() queryParams: API.Events.Get.QueryParams,
  ): Promise<API.Events.Get.Response> {
    return this.eventDao.find(params.userName, queryParams)
  }

  @Get('/user/:userName/events/groupBy/:groupBy')
  async groupBy (
    @Params() params: API.Events.Get.GroupBy.Params,
    @QueryParams() queryParams: API.Events.Get.GroupBy.QueryParams,
  ): Promise<API.Events.Get.GroupBy.Response> {
    const events: EventModel[] = await this.eventDao.find(params.userName, queryParams)

    return <API.Events.Get.GroupBy.Response> groupByField(params.groupBy, events)
  }
}

import { Authorized, Body, ContentType, Get, JsonController, Params, Post, QueryParams } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { EventDao } from '../dao/eventDao'
import { EventModel } from '../models/event'
import { groupByField } from '../helpers/groupBy'
import * as json2csv from 'json2csv'
import * as moment from 'moment'
import validator from 'validator'
import * as _ from 'lodash'
import { Ai } from '../services/ai'

@JsonController()
export class EventController {
  constructor (
    private readonly eventDao: EventDao,
    private readonly ai: Ai,
  ) {
  }

  @Post('/events')
  @Authorized()
  async index (@Body() body: API.Events.Post.Body): Promise<API.Events.Post.Response> {
    const event: EventModel = await this.eventDao.create(body.user, body.activity, body.productivityRate)
    event.productivityPrediction = await this.ai.getPrediction(body.user)

    return event
  }

  @Get('/user/:userName/events')
  async list (
    @Params() params: API.Events.Get.Params,
    @QueryParams() queryParams: API.Events.Get.QueryParams,
  ): Promise<API.Events.Get.Response> {
    return this.eventDao.find(params.userName, queryParams)
  }

  @Get('/user/:userName/events.csv')
  @ContentType('text/csv')
  async listCsv (
    @Params() params: API.Events.Get.Params,
    @QueryParams() queryParams: API.Events.Get.QueryParams,
  ): Promise<string> {
    const data: API.Events.Get.Response = await this.eventDao.find(params.userName, queryParams)
    // tslint:disable-next-line:no-non-null-assertion no-any
    const activities: any = data.map((event: EventModel): string => event.activity!.uuid!)
      .reduce((accumulator: Object, currentValue: string): any => {
        // @ts-ignore
        if (accumulator[currentValue] === undefined) {
          // @ts-ignore
          accumulator[currentValue] = Object.keys(accumulator).length
        }

        return accumulator
      }, {})

    // tslint:disable-next-line:typedef no-any
    const dataOut: any = data.map((event: EventModel) => {
      // tslint:disable:newline-per-chained-call no-any
      const newEvent: any = {
        ...event,
        time: event.time ?? 0,
        weekday: moment(event.createdAt).weekday(),
        hour: moment(event.createdAt).hour(),
        productivityRate: typeof event.productivityRate === 'number' ? event.productivityRate : 0,
        // @ts-ignore
        activityId: activities[event.activity.uuid],
      }

      delete newEvent.user
      delete newEvent.activity
      delete newEvent.uuid
      delete newEvent.createdAt

      return newEvent
    })

    return json2csv.parse(JSON.parse(JSON.stringify(dataOut)))
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

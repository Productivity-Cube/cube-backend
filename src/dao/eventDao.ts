import { Event, EventModel } from '../models/event'
import * as uuid from 'uuid'
import { Inject, Service } from 'typedi'
import { ActivityDao } from './activityDao'
import { Activity, ActivityModel } from '../models/activity'
import { UserDao } from './userDao'
import { User, UserModel } from '../models/user'
import { API } from '../publicInterfaces'
import * as Sequelize from 'sequelize'
import * as _ from 'lodash'
import * as moment from 'moment'

// tslint:disable:newline-per-chained-call

@Service()
export class EventDao {
  @Inject()
  private readonly activityDao: ActivityDao

  @Inject()
  private readonly userDao: UserDao

  constructor (
    activityDao: ActivityDao,
    userDao: UserDao,
  ) {
    this.activityDao = activityDao
    this.userDao = userDao
  }

  public async create (userName: string, activityName: string, productivityRate?: number): Promise<EventModel> {
    const activity: ActivityModel = await this.activityDao.getByName(activityName)
    const user: UserModel = await this.userDao.getByName(userName)

    const event: Event = await Event.create({
      uuid: uuid.v4(),
      name: userName,
      productivityRate,
      userId: user.uuid,
      activityId: activity.uuid,
    })

    await this.updateLastEventWithTimeDuration(userName, event.toJSON())

    return (<Event> (await Event.findOne({
      where: {
        uuid: <string> event.uuid,
      },
      include: [{ all: true }],
    }))).toJSON()
  }

  // tslint:disable-next-line:cyclomatic-complexity max-func-body-length
  public async find (
    userName: string,
    queryParams: API.Events.Get.QueryParams,
  ): Promise<EventModel[]> {
    const group: string[] = []
    const attributes: Sequelize.FindAttributeOptions = ['uuid', 'productivityRate', 'time', 'createdAt']
    const activityWhere: {
      name?: string;
    } = {}

    const eventWhere: {
      createdAt?: Object;
      productivityRate?: string;
    } = {}

    if (!_.isUndefined(queryParams.activity)) {
      activityWhere.name = queryParams.activity
    }

    if (!_.isUndefined(queryParams.productivityRate)) {
      eventWhere.productivityRate = <string> queryParams.productivityRate
    }

    if (!_.isUndefined(queryParams.dateFrom)) {
      eventWhere.createdAt = {
        [Sequelize.Op.gte]: moment(queryParams.dateFrom).toDate()
      }
    }

    if (!_.isUndefined(queryParams.dateTo)) {
      eventWhere.createdAt = {
        ...eventWhere.createdAt,
        [Sequelize.Op.lte]: moment(queryParams.dateTo).toDate()
      }
    }

    if (!_.isUndefined(queryParams.groupBy)) {
      group.push(queryParams.groupBy)
      attributes.push([Sequelize.fn('sum', Sequelize.col('time')), 'time'])
      attributes.push([Sequelize.literal('null'), 'createdAt'])
    }

    return (await Event.findAll({
      attributes: attributes,
      where: <Sequelize.WhereOptions> eventWhere,
      include: [{
        model: Activity,
        where: <Sequelize.WhereOptions> activityWhere,
      }, {
        model: User,
        where: {
          name: userName
        }
      }],
      order: [['createdAt', 'desc']],
      group: _.isEmpty(group) ? undefined : group,
    })).map((event: Event): EventModel => event.toJSON())
  }

  private async updateLastEventWithTimeDuration (userName: string, newEvent: EventModel): Promise<void> {
    const lastEvent: Event | null = await Event.findOne({
      where: {
        uuid: {
          [Sequelize.Op.not]: newEvent.uuid,
        },
      },
      include: [{
        model: User,
        where: {
          name: userName,
        },
        required: true,
      }],
      order: [['createdAt', 'DESC']],
      limit: 1,
    })

    if (lastEvent === null) {
      return
    }

    // tslint:disable-next-line:radix
    lastEvent.time = parseInt(moment.duration(
      // @ts-ignore
      moment(newEvent.createdAt) - moment(lastEvent.createdAt)
    ).asMinutes().toFixed(0))

    await lastEvent.save()
  }
}

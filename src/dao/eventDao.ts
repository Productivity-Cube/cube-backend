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

    return (<Event> (await Event.findOne({
      where: {
        uuid: <string> event.uuid,
      },
      include: [{ all: true }],
    }))).toJSON()
  }

  public async find (
    userName: string,
    queryParams: API.Events.Get.QueryParams,
  ): Promise<EventModel[]> {
    const activityWhere: {
      name?: string;
    } = {}

    const eventWhere: {
      createdAt?: Object;
    } = {}

    if (!_.isUndefined(queryParams.activity)) {
      activityWhere.name = queryParams.activity
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

    return (await Event.findAll({
      where: <Sequelize.WhereOptions> eventWhere,
      include: [{
        model: Activity,
        where: <Sequelize.WhereOptions> activityWhere,
      }, {
        model: User,
        where: {
          name: userName
        }
      }]
    })).map((event: Event): EventModel => event.toJSON())
  }
}

import { Event, EventModel } from '../models/event'
import * as uuid from 'uuid'
import { Inject, Service } from 'typedi'
import { ActivityDao } from './activityDao'
import { ActivityModel } from '../models/activity'
import { UserDao } from './userDao'
import { User, UserModel } from '../models/user'

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
}

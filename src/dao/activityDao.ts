import * as _ from 'lodash'
import { ActivityNotFoundError } from '../errors/apiErrors'
import { Service } from 'typedi'
import { Activity, ActivityModel } from '../models/activity'

@Service()
export class ActivityDao {
  public async getByName (name: string): Promise<ActivityModel> {
    const activity: Activity | null = await Activity.findOne({
      where: {
        name,
      }
    })

    if (_.isNull(activity)) {
      throw new ActivityNotFoundError()
    }

    return activity.toJSON()
  }
}

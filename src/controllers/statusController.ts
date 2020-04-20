import { Get, JsonController } from 'routing-controllers'
import { API } from '../publicInterfaces'

@JsonController()
export class StatusController {

  @Get('/')
  async index (): Promise<API.Status.Get.Response> {
    return {
      status: 'ok'
    }
  }
}

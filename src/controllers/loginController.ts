import { Body, JsonController, Post } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { UserDao } from '../dao/userDao'

@JsonController()
export class LoginController {
  constructor (
    private readonly userDao: UserDao,
  ) {
  }

  @Post('/login')
  async index (@Body() body: API.Login.Post.Body): Promise<API.Login.Post.Response> {
    const name: string = <string> body.name

    try {
      return (await this.userDao.getByName(name))
    } catch (error) {
      return this.userDao.createUserWithKey(name)
    }
  }
}

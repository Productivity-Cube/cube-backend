import { Body, JsonController, Post } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { User, UserModel } from '../models/user'
import { UserDao } from '../dao/userDao'

@JsonController()
export class LoginController {
  constructor (
    private readonly userDao: UserDao,
  ) {
  }

  @Post('/login')
  // tslint:disable-next-line:no-any
  async index (@Body() body: API.Login.Post.Body): Promise<UserModel> {
    const name: string = <string> body.name

    try {
      return (await this.userDao.getByName(name))
    } catch (error) {
      return (await this.userDao.createUserWithKey(name))
    }
  }
}

import { Body, JsonController, Post } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { UserModel } from '../models/user'
import { UserDao } from '../dao/userDao'

@JsonController()
export class LoginController {
  constructor (
    private readonly userDao: UserDao,
  ) {
  }

  @Post('/login')
  async index (@Body() body: API.Login.Post.Body): Promise<UserModel> {
    const name: string = <string> body.name

    try {
      return (await this.userDao.getByName(name))
    } catch (error) {
      return this.userDao.createUserWithKey(name)
    }
  }
}

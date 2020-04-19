import { Body, JsonController, Post } from 'routing-controllers'
import { API } from '../publicInterfaces'
import { User } from '../entity/user'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UserRepository } from '../repository/userRepository'

@Service()
@JsonController()
export class LoginController {
  constructor (
    private userRepository: UserRepository,
  ) {
    console.log('HEJ ', this.userRepository)
  }

  @Post('/login')
  async index (@Body() body: API.Login.Post.Body): Promise<User> {
    const name: string = <string> body.name
    console.log('HEJ ', this.userRepository, name)
    throw new Error();
    // console.log('TUTAJ2', this, this.userRepository, name)
    // try {
    //   return (await this.userRepository.getByName(name))
    // } catch (error) {
    //   return this.userRepository.createUserWithKey(name)
    // }
  }
}

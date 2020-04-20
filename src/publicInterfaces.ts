import { IsNotEmpty, IsString, MinLength, ValidationError } from 'class-validator'
import { UserModel } from './models/user'

export namespace API {
  export interface ValidationErrorResponse {
    name: string
    message: string
    errors: ValidationError[]
  }

  export namespace Status {
    export namespace Get {
      export interface Response {
        status: string
      }
    }
  }
  export namespace Login {
    export namespace Post {
      export class Body {
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        name?: string
      }

      export type Response = UserModel
    }
  }
}

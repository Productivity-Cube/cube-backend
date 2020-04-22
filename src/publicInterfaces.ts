import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, MinLength, ValidationError } from 'class-validator'
import { UserModel } from './models/user'
import { EventModel } from './models/event'

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
  export namespace Event {
    export namespace Post {
      export class Body {
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        user: string = ''

        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        activity: string = ''

        @IsNumber()
        @Min(1)
        @Max(3)
        @IsOptional()
        productivityRate?: number
      }
      export type Response = EventModel
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

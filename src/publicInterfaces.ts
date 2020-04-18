import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export namespace API {
  export namespace Login {
    export namespace Post {
      export class Body {
        @IsNotEmpty()
        @IsString()
        @MinLength(6)
        name?: string
      }
    }
  }
}

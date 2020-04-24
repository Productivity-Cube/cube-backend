import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'
import { Request, Response } from 'express'

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {

  // tslint:disable:typedef max-func-args no-unused
  error (
    error: { httpCode: number; message: string; errors?: Object },
    request: Request,
    response: Response,
    next: (err: Error) => Function) {
    response.status(error.httpCode)

    return response.send({
      httpCode: error.httpCode,
      message: error.message,
      name: error.constructor.name,
      errors: error.hasOwnProperty('errors') ? error.errors : undefined,
    })
  }
}

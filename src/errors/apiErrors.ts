import { HttpError } from 'routing-controllers'

export class UserNotFoundError extends HttpError {
  constructor () {
    super(404, 'User not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype)
  }
}
export class ActivityNotFoundError extends HttpError {
  constructor () {
    super(404, 'Activity not found');
    Object.setPrototypeOf(this, ActivityNotFoundError.prototype)
  }
}
export class ApiKeyNotFoundError extends HttpError {
  constructor () {
    super(404, 'Api Key not found');
    Object.setPrototypeOf(this, ApiKeyNotFoundError.prototype)
  }
}

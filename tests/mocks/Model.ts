export class ModelMock {
  constructor (private readonly data: Object) {
  }

  public toJSON (): Object {
    return this.data
  }

  public save (): Object {
    return this.data
  }
}

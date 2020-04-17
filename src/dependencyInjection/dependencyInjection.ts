export class DependencyInjection {
  private readonly services: { [key: string]: Object } = {}

  addService (name: string, service: Object): void {
    this.services[name] = service
  }

  getService<T> (name: string): T {
    return <T> this.services[name]
  }
}

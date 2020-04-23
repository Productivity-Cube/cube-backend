import { request } from '../setup'
import { API } from '../../../src/publicInterfaces'

// tslint:disable:no-backbone-get-set-outside-model no-duplicate-string

export async function loginCall<T> (name: string, status: number): Promise<API.Login.Post.Response | T> {
  const response: { body: Object } = await request
    .post('/api/login')
    .send({ name })
    .expect(status)
    .set('Accept', 'application/json')

  return response.body
}

export async function statusCall (): Promise<API.Status.Get.Response> {
  const response: { body: Object } = await request
    .get('/api/')
    .expect(200)
    .set('Accept', 'application/json')

  return <API.Status.Get.Response> response.body
}

export async function createEvent<T> (
  user: string,
  activity: string,
  productivityRate?: number,
  status: number = 200,
): Promise<API.Events.Post.Response | T> {
  const response: { body: Object } = await request
    .post('/api/events')
    .send({
      activity,
      user,
      productivityRate,
    })
    .expect(status)
    .set('Accept', 'application/json')

  return response.body
}

export async function listUserEvents<T> (
  userName: string,
  query: API.Events.Get.QueryParams,
  status: number = 200
): Promise<API.Events.Get.Response | T> {
  const response: { body: Object } = await request
    .get(`/api/user/${userName}/events`)
    .query(query)
    .expect(status)
    .set('Accept', 'application/json')

  return <API.Events.Get.Response | T> response.body
}

export async function listUserEventsGroupBy<T> (
  userName: string,
  groupBy: string,
  query: API.Events.Get.GroupBy.QueryParams,
  status: number = 200
): Promise<API.Events.Get.GroupBy.Response | T> {
  const response: { body: Object } = await request
    .get(`/api/user/${userName}/events/groupBy/${groupBy}`)
    .query(query)
    .expect(status)
    .set('Accept', 'application/json')

  return <API.Events.Get.GroupBy.Response | T> response.body
}

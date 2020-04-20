import { request } from '../setup'
import { API } from '../../../src/publicInterfaces'

// tslint:disable:no-backbone-get-set-outside-model

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

import axios from 'axios'

import { ok, serverError } from '../utils/commons/helpers/http/HttpHelper'
import { HttpResponse } from '../utils/commons/helpers/protocols/Http'

export class ApiService<TResponse> {
  constructor(
    private readonly _header: {
      key: string
      value: string
    }[] = null
  ) {}

  async execPost<TRequest>(
    url: string,
    data: TRequest,
    params: any = null
  ): Promise<HttpResponse<TResponse>> {
    try {
      const result = await axios.post<TResponse>(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params,
      })
      return ok(result.data)
    } catch (error) {
      console.log('error')
      console.log(error)
      return serverError(error)
    }
  }

  async execGet(
    url: string,
    params: any = null
  ): Promise<HttpResponse<TResponse>> {
    try {
      let headers = null
      if (this._header) {
        headers = {}
        this._header.map((item) => {
          headers[item['key']] = item['value']
        })
      }

      const result = await axios.get<TResponse>(url, {
        headers: headers,
        params: params,
      })

      return ok(result.data)
    } catch (error) {
      return serverError(error)
    }
  }
}

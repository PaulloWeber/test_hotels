import { injectable } from 'inversify'

import { IWheaterService } from '../domain/interfaces/services/IWheaterService'
import { serverError } from '../utils/commons/helpers/http/HttpHelper'
import { HttpResponse } from '../utils/commons/helpers/protocols/Http'
import { ApiService } from './ApiService'

@injectable()
export class WheaterService implements IWheaterService {
  constructor(private readonly _baseUrl = process.env.WHEATER_URL) {}

  async getWheaterByLocation(
    latitude: string,
    longitude: string
  ): Promise<HttpResponse<any>> {
    try {
      const url =
        `${this._baseUrl}/v1/current.json?key=` +
        process.env.WHEATER_KEY +
        `&q=` +
        latitude +
        `,` +
        longitude +
        `&aqi=no`
      const apiService = new ApiService<string>()
      return await apiService.execGet(url)
    } catch (error) {
      return serverError(error)
    }
  }
}

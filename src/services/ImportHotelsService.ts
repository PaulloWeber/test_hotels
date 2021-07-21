import { injectable } from 'inversify'
import querystring from 'querystring'

import { ResultAuthOfferDto } from '../application/dto/_commons/ResultAuthOfferDto'
import { IImportHotelsService } from '../domain/interfaces/services/IImportHotelsService'
import {
  badRequest,
  serverError,
} from '../utils/commons/helpers/http/HttpHelper'
import { HttpResponse } from '../utils/commons/helpers/protocols/Http'
import { ApiService } from './ApiService'

@injectable()
export class ImportHotelsService implements IImportHotelsService {
  constructor(private readonly _baseUrl = process.env.AMADEUS_OFFER_BASE_URL) {}

  async getHotels(cityCode: string): Promise<HttpResponse<any>> {
    try {
      const auth = await this.auth()
      let token

      if (auth.statusCode !== 200) return badRequest(null, auth)
      else token = auth.data.access_token

      const url =
        `${this._baseUrl}/v2/shopping/hotel-offers?cityCode=` +
        cityCode +
        `&roomQuantity=2&adults=1&radius=300&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=NONE`
      const header = [
        {
          key: 'Authorization',
          value: 'Bearer ' + token,
        },
      ]

      const apiService = new ApiService<string>(header)
      return await apiService.execGet(url)
    } catch (error) {
      return serverError(error)
    }
  }

  async getOffers(hotelCode: string): Promise<HttpResponse<any>> {
    try {
      const auth = await this.auth()
      let token

      if (auth.statusCode !== 200) return badRequest(null, auth)
      else token = auth.data.access_token

      const url =
        `${this._baseUrl}/v2/shopping/hotel-offers/by-hotel?hotelId=` +
        hotelCode
      const header = [
        {
          key: 'Authorization',
          value: 'Bearer ' + token,
        },
      ]

      const apiService = new ApiService<string>(header)
      return await apiService.execGet(url)
    } catch (error) {
      return serverError(error)
    }
  }

  async auth(): Promise<HttpResponse<ResultAuthOfferDto>> {
    const url = `${this._baseUrl}/v1/security/oauth2/token`
    const data = {
      grant_type: process.env.AMADEUS_GRANT_TYPE,
      client_secret: process.env.AMADEUS_CLIENT_SECRET,
      client_id: process.env.AMADEUS_CLIENT_KEY,
    }

    const apiService = new ApiService<ResultAuthOfferDto>()
    return await apiService.execPost(url, querystring.stringify(data))
  }
}

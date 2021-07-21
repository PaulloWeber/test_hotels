import { HttpResponse } from '../../../utils/commons/helpers/protocols/Http'

export interface IImportHotelsService {
  getHotels: (cityCode: string) => Promise<HttpResponse<string>>
  getOffers: (hotelCode: string) => Promise<HttpResponse<string>>
}

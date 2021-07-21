import { HttpResponse } from '../../../utils/commons/helpers/protocols/Http'

export interface IWheaterService {
  getWheaterByLocation: (
    latitude: string,
    longitude: string
  ) => Promise<HttpResponse<string>>
}

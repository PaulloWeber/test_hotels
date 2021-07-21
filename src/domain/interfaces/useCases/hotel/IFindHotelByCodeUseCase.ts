import { HttpResponse } from '../../../../utils/commons/helpers/protocols/Http'
import { Hotel } from '../../../models/Hotel.entity'

export interface IFindHotelByCodeUseCase {
  execute: (code: string) => Promise<HttpResponse<Hotel>>
}

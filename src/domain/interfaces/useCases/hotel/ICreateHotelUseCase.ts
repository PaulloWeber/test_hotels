import { CreateHotelDto } from '../../../../application/dto/hotel/CreateHotelDto'
import { HttpResponse } from '../../../../utils/commons/helpers/protocols/Http'
import { Hotel } from '../../../models/Hotel.entity'

export interface ICreateHotelUseCase {
  execute: (dto: CreateHotelDto) => Promise<HttpResponse<Hotel>>
}

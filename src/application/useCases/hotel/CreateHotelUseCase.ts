import { inject, injectable } from 'inversify'

import { IHotelRepository } from '../../../domain/interfaces/repositories/IHotelRepository'
import { ICreateHotelUseCase } from '../../../domain/interfaces/useCases/hotel/ICreateHotelUseCase'
import { Hotel } from '../../../domain/models/Hotel.entity'
import { TYPES_HOTEL } from '../../../main/inversify/types'
import { ok } from '../../../utils/commons/helpers/http/HttpHelper'
import { HttpResponse } from '../../../utils/commons/helpers/protocols/Http'
import { CreateHotelDto } from '../../dto/hotel/CreateHotelDto'

@injectable()
export class CreateHotelUseCase implements ICreateHotelUseCase {
  constructor(
    @inject(TYPES_HOTEL.IHotelRepository)
    private readonly _hotelRepository: IHotelRepository
  ) {}

  async execute(dto: CreateHotelDto): Promise<HttpResponse<Hotel>> {
    const hotel = new Hotel()
    hotel.cityCode = dto.cityCode
    hotel.name = dto.name
    hotel.latitude = dto.latitude
    hotel.longitude = dto.longitude
    hotel.phone = dto.phone
    hotel.address = dto.address
    hotel.countryCode = dto.countryCode
    hotel.code = dto.code

    const hotelInsertResponse = await this._hotelRepository.add(hotel)
    return ok(hotelInsertResponse)
  }
}

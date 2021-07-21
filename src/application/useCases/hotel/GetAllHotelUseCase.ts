import { inject, injectable } from 'inversify'

import { IHotelRepository } from '../../../domain/interfaces/repositories/IHotelRepository'
import { IImportHotelsService } from '../../../domain/interfaces/services/IImportHotelsService'
import { IWheaterService } from '../../../domain/interfaces/services/IWheaterService'
import { IGetAllHotelUseCase } from '../../../domain/interfaces/useCases/hotel/IGetHotelUseCase'
import { Hotel } from '../../../domain/models/Hotel.entity'
import { TYPES_HOTEL, TYPES_SERVICES } from '../../../main/inversify/types'
import { ResultPagination } from '../../../utils/commons/helpers/results/ResultPagination'
import { GetAllHotelDto } from '../../dto/hotel/GetAllHotelDto'

@injectable()
export class GetAllHotelUseCase implements IGetAllHotelUseCase {
  constructor(
    @inject(TYPES_HOTEL.IHotelRepository)
    private readonly _hotelRepository: IHotelRepository,

    @inject(TYPES_SERVICES.IImportHotelsService)
    private readonly _importHotelsService: IImportHotelsService,

    @inject(TYPES_SERVICES.IWheaterService)
    private readonly _wheaterService: IWheaterService
  ) {}

  async execute(dto: GetAllHotelDto): Promise<ResultPagination<Hotel[]>> {
    const hotels = await this._hotelRepository.getAllPagging(dto)
    await Promise.all(
      hotels.data.map(async (hotel) => {
        const responseOffers = await this._importHotelsService.getOffers(
          hotel.code
        )
        const responseWheater = await this._wheaterService.getWheaterByLocation(
          hotel.latitude,
          hotel.longitude
        )

        if (responseOffers.statusCode === 200)
          hotel['offers'] = this.setOffers(responseOffers)
        else hotel['offers'] = null

        if (responseWheater.statusCode === 200)
          hotel['wheater'] = this.setWheater(responseWheater)
        else hotel['wheater'] = null
      })
    )
    return hotels
  }

  setOffers(response: any): any {
    const responseOffersObject = JSON.parse(JSON.stringify(response.data))
    return responseOffersObject.data.offers.map((offer) => {
      return {
        checkInDate: offer.checkInDate,
        checkOutDate: offer.checkOutDate,
        priceBase: offer.price.base,
        priceTotal: offer.price.total,
        priceCurrency: offer.price.currency,
        roomQuantity: offer.roomQuantity,
      }
    })
  }

  setWheater(response: any): any {
    if (response.data) {
      return {
        temperaturaC: response.data.current.temp_c,
        temperaturaF: response.data.current.temp_f,
        isDayTime: response.data.current.is_day === 1 ? true : false,
        wheaterText: response.data.current.condition.text,
      }
    }
  }
}

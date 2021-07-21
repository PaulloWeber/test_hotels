import { inject, injectable } from 'inversify'

import { IHotelRepository } from '../../../domain/interfaces/repositories/IHotelRepository'
import { IImportHotelsService } from '../../../domain/interfaces/services/IImportHotelsService'
import { IWheaterService } from '../../../domain/interfaces/services/IWheaterService'
import { IFindHotelByCodeUseCase } from '../../../domain/interfaces/useCases/hotel/IFindHotelByCodeUseCase'
import { Hotel } from '../../../domain/models/Hotel.entity'
import { TYPES_HOTEL, TYPES_SERVICES } from '../../../main/inversify/types'
import { badRequest, ok } from '../../../utils/commons/helpers/http/HttpHelper'
import { HttpResponse } from '../../../utils/commons/helpers/protocols/Http'
@injectable()
export class FindHotelByCodeUseCase implements IFindHotelByCodeUseCase {
  constructor(
    @inject(TYPES_HOTEL.IHotelRepository)
    private readonly repository: IHotelRepository,

    @inject(TYPES_SERVICES.IImportHotelsService)
    private readonly _importHotelsService: IImportHotelsService,

    @inject(TYPES_SERVICES.IWheaterService)
    private readonly _wheaterService: IWheaterService
  ) {}

  async execute(code: string): Promise<HttpResponse<Hotel>> {
    const hotel = await this.repository.findByCode(code)
    if (!hotel) return badRequest('Hotel não encontrado')

    hotel['offers'] = null
    hotel['wheater'] = null

    const responseOffers = await this._importHotelsService.getOffers(hotel.code)
    const responseWheater = await this._wheaterService.getWheaterByLocation(
      hotel.latitude,
      hotel.longitude
    )

    if (responseOffers.statusCode === 200) {
      const objectResponseOffers = JSON.parse(
        JSON.stringify(responseOffers.data)
      )
      if (objectResponseOffers.data.offers)
        hotel['offers'] = objectResponseOffers.data.offers
    }

    if (responseWheater.statusCode === 200) {
      const objectResponseWheater = JSON.parse(
        JSON.stringify(responseWheater.data)
      )
      if (objectResponseWheater) hotel['wheater'] = objectResponseWheater
    }

    return ok(hotel, 'Hotel buscado com sucesso')
  }
}

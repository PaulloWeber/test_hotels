import { ContainerModule } from 'inversify'

import { HotelController } from '../../../../api/controllers/HotelController'
import { CreateHotelUseCase } from '../../../../application/useCases/hotel/CreateHotelUseCase'
import { FindHotelByCodeUseCase } from '../../../../application/useCases/hotel/FindHotelByCodeUseCase'
import { GetAllHotelUseCase } from '../../../../application/useCases/hotel/GetAllHotelUseCase'
import { HotelRepository } from '../../../../infra/database/repositories/hotel/HotelRepository'
import { TYPES_HOTEL } from './types.hotel'

export const bindingsHotel = new ContainerModule((bind) => {
  require('../../../../api/controllers/HotelController')
  bind<HotelController>(TYPES_HOTEL.HotelController).to(HotelController)
  bind<HotelRepository>(TYPES_HOTEL.IHotelRepository).to(HotelRepository)
  bind<CreateHotelUseCase>(TYPES_HOTEL.ICreateHotelUseCase).to(
    CreateHotelUseCase
  )
  bind<GetAllHotelUseCase>(TYPES_HOTEL.IGetAllHotelUseCase).to(
    GetAllHotelUseCase
  )
  bind<FindHotelByCodeUseCase>(TYPES_HOTEL.IFindHotelByCodeUseCase).to(
    FindHotelByCodeUseCase
  )
})

import { GetAllHotelDto } from '../../../../application/dto/hotel/GetAllHotelDto'
import { ResultPagination } from '../../../../utils/commons/helpers/results/ResultPagination'
import { Hotel } from '../../../models/Hotel.entity'

export interface IGetAllHotelUseCase {
  execute: (dto: GetAllHotelDto) => Promise<ResultPagination<Hotel[]>>
}

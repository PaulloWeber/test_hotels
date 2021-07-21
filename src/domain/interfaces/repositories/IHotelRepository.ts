import { GetAllHotelDto } from '../../../application/dto/hotel/GetAllHotelDto'
import { ResultPagination } from '../../../utils/commons/helpers/results/ResultPagination'
import { Hotel } from '../../models/Hotel.entity'
import { IBaseRepository } from './base/IBaseRepository'

export interface IHotelRepository extends IBaseRepository<Hotel> {
  getAllPagging: (request: GetAllHotelDto) => Promise<ResultPagination<Hotel[]>>
  findByCode(code: string): Promise<Hotel>
}

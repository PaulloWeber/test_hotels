import { injectable } from 'inversify'
import { getMongoManager, getMongoRepository } from 'typeorm'

import { GetAllHotelDto } from '../../../../application/dto/hotel/GetAllHotelDto'
import { IHotelRepository } from '../../../../domain/interfaces/repositories/IHotelRepository'
import { Hotel } from '../../../../domain/models/Hotel.entity'
import { ResultPagination } from '../../../../utils/commons/helpers/results/ResultPagination'
import { adapFilter } from '../../../adapters/AdapterFilter'

@injectable()
export class HotelRepository implements IHotelRepository {
  async getAll(filters: Hotel): Promise<Hotel[]> {
    throw new Error('Method not implemented.')
  }
  update(id: string, data: Hotel): Promise<Hotel> {
    throw new Error('Method not implemented.')
  }
  async add(model: Hotel): Promise<Hotel> {
    const manager = getMongoManager()
    return await manager.save(model)
  }
  async findById(id: string): Promise<Hotel> {
    const repository = getMongoRepository(Hotel)
    const hotel = await repository.findOne({ _id: id })
    return hotel
  }
  async findByCode(code: string): Promise<Hotel> {
    const repository = getMongoRepository(Hotel)
    const hotel = await repository.findOne({ code })
    return hotel
  }
  async getAllPagging(
    request: GetAllHotelDto
  ): Promise<ResultPagination<Hotel[]>> {
    const repository = getMongoRepository(Hotel)

    request = adapFilter(request)

    const [data, count] = await repository.findAndCount({
      where: this.setFilters(request),
      skip: Number(request.skip),
      take: Number(request.pageSize),
    })
    return new ResultPagination(data, count, request.pageSize, request.page)
  }
  setFilters(request: GetAllHotelDto): any {
    const filters = []

    if (request.code) {
      filters.push({
        code: request.code,
      })
    }

    if (request.name) {
      filters.push({
        name: new RegExp(`^${request.name}`),
      })
    }

    if (request.address) {
      filters.push({
        address: new RegExp(`^${request.address}`),
      })
    }

    if (request.cityCode) {
      filters.push({
        cityCode: request.cityCode,
      })
    }

    if (request.countryCode) {
      filters.push({
        countryCode: request.countryCode,
      })
    }

    if (filters.length === 0) return null
    else
      return {
        $or: filters,
      }
  }
}

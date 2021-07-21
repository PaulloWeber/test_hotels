import { RequestGetAllDto } from '../_commons/RequestGetAllDto'

export class GetAllHotelDto extends RequestGetAllDto {
  id: string
  name: string
  cityCode: string
  countryCode: string
  code: string
  address: string
  latitude: string
  longitude: string
}

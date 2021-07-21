import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, request, response } from 'inversify-express-utils'

import { GetAllHotelDto } from '../../application/dto/hotel/GetAllHotelDto'
import { IFindHotelByCodeUseCase } from '../../domain/interfaces/useCases/hotel/IFindHotelByCodeUseCase'
import { IGetAllHotelUseCase } from '../../domain/interfaces/useCases/hotel/IGetHotelUseCase'
import { TYPES_HOTEL } from '../../main/inversify/types'
import { RequestFilter } from '../../utils/commons/helpers/protocols/Http'
import { AdaptResponse } from '../adapters/AdaptHttpResponse'

@controller('/api/hotel')
export class HotelController {
  constructor(
    @inject(TYPES_HOTEL.IGetAllHotelUseCase)
    private _getAllHotelUseCase: IGetAllHotelUseCase,

    @inject(TYPES_HOTEL.IFindHotelByCodeUseCase)
    private _findHotelByCodeUseCase: IFindHotelByCodeUseCase
  ) {}

  @httpGet('/')
  private async findAll(
    @request() req: RequestFilter<GetAllHotelDto>,
    @response() res: Response
  ) {
    try {
      return new AdaptResponse(res).adaptQuery(
        await this._getAllHotelUseCase.execute(req.query)
      )
    } catch (error) {
      return new AdaptResponse(res).adaptError(error)
    }
  }

  @httpGet('/:code')
  private async findHotelByCode(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      return new AdaptResponse(res).adapt(
        await this._findHotelByCodeUseCase.execute(req.params.code)
      )
    } catch (error) {
      return new AdaptResponse(res).adaptError(error)
    }
  }
}

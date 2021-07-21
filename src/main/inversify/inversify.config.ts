import 'reflect-metadata'

import { Container } from 'inversify'

import { bindingsHotel } from './inversify/hotel/inversify.hotel.config'
import { bindingsService } from './inversify/services/inversify.services.config'

const container = new Container()

container.load(bindingsHotel)
container.load(bindingsService)

export { container }

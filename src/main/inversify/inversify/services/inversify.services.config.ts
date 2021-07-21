import { ContainerModule } from 'inversify'

import { ImportHotelsService } from '../../../../services/ImportHotelsService'
import { WheaterService } from '../../../../services/WheaterService'
import { TYPES_SERVICES } from './types.services'

export const bindingsService = new ContainerModule((bind) => {
  bind<ImportHotelsService>(TYPES_SERVICES.IImportHotelsService).to(
    ImportHotelsService
  )
  bind<WheaterService>(TYPES_SERVICES.IWheaterService).to(WheaterService)
})

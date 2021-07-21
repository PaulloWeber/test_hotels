import { RequestGetAllDto } from '../../application/dto/_commons/RequestGetAllDto'

export function adapFilter<T extends RequestGetAllDto>(request: T): T {
  const baseRequest = new RequestGetAllDto(
    request.sort,
    request.page,
    request.pageSize,
    request.order
  )
  return { ...request, ...baseRequest }
}

export class RequestGetAllDto {
  constructor(sort?: string, page?: number, pageSize?: number, order?: string) {
    this.page = page ?? 1
    this.pageSize = pageSize ?? 10
    this.sort = sort ?? 'id'
    this.order = this.getTypeOrder(order)
    this.skip = this.pageSize * (this.page - 1)
  }

  page: number
  pageSize: number
  sort: string
  order: 'ASC' | 'DESC'
  skip: number

  private getTypeOrder(order: string): 'ASC' | 'DESC' {
    if (!order) {
      return 'ASC'
    }

    return order.toLowerCase() == 'desc' ? 'DESC' : 'ASC'
  }
}

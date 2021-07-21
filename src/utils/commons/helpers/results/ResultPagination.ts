export class ResultPagination<T> {
  constructor(data: T, count: number, pageSize: number, page: number) {
    this.data = data
    this.count = count
    this.pageSize = pageSize
    this.page = page

    this.totalPages = Math.ceil(count / pageSize)
  }

  data: T
  count: number
  page: number
  totalPages: number
  pageSize: number
}

export type HttpResponse<TObjct = any> = {
  success: boolean
  statusCode: number
  data: TObjct
  messages: Array<string>
}

export type RequestFilter<TQuery, THeaders = any> = {
  query: TQuery
  headers: THeaders
  params: any
}

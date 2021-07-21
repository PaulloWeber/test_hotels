import { UnauthorizedError } from '../../../../utils/commons/helpers/errors/UnauthorizedError'
import { HttpResponse } from '../../../../utils/commons/helpers/protocols/Http'
import { Messages } from '../../resources/messages/shared/MessagesResources'

export const badRequest = <TData>(
  error: string,
  data: TData = null
): HttpResponse => ({
  success: false,
  statusCode: 400,
  data: data,
  messages: [error],
})

export const badRequestArray = <TData>(
  errors: string[],
  data: TData = null
): HttpResponse => ({
  success: false,
  statusCode: 400,
  data: data,
  messages: errors,
})

export const forbidden = (error: string): HttpResponse => ({
  success: false,
  statusCode: 403,
  data: null,
  messages: [error],
})

export const unauthorized = (): HttpResponse => ({
  success: false,
  statusCode: 401,
  data: new UnauthorizedError(),
  messages: [Messages.UNAUTHORIZED],
})

export const serverError = (error: Error): HttpResponse => ({
  success: false,
  statusCode: 500,
  data: error,
  messages: [Messages.INTERNAL_ERROR],
})

export const ok = <TObject = any>(
  data: TObject = null,
  message: string = null
): HttpResponse<TObject> => ({
  success: true,
  statusCode: 200,
  data: data,
  messages: [message],
})

export const noContent = (): HttpResponse => ({
  success: true,
  statusCode: 204,
  data: null,
  messages: null,
})

export const offlineSyncBadRequest = (args: {
  message: string
  error: string
  id?: string
  data?: any
}): { message: string; error: string; id?: string; data?: any } => args

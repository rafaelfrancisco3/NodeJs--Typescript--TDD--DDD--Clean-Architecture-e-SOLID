import { ServerError } from '../Erros'
import { IHttpResponse } from '../Interfaces/IHttp'

export const BadRequest = (error: Error): IHttpResponse => ({
        StatusCode: 400,
        Body: error
})
export const InternalServerError = (): IHttpResponse => ({
        StatusCode: 500,
        Body: new ServerError()
})

export const Ok = (data: any): IHttpResponse => ({
        StatusCode: 200,
        Body: data
})
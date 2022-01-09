import { IHttpResponse } from '../Interfaces/IHttp'

export const BadRequest = (error: Error): IHttpResponse => ({
        StatusCode: 400,
        Body: error
})
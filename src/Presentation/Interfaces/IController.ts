import { IHttpRequest, IHttpResponse } from './IHttp'

export interface IController {
    handle (HttpRequest: IHttpRequest): IHttpResponse
}
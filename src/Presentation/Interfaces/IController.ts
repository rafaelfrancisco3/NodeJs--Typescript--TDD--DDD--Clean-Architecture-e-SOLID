import { IHttpRequest, IHttpResponse } from './IHttp'

export interface IController {
    Handle (HttpRequest: IHttpRequest): Promise<IHttpResponse>
}
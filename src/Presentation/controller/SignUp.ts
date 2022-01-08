import { HttpRequest, HttpResponse} from '../Protocols/Http'
import { MissingParamError } from '../Erros/Missing-param-error'

export class SignUpController{
    handle (HttpRequest: HttpRequest): HttpResponse  {
        if(!HttpRequest.Body.name) {
            return { 
                StatusCode: 400,
                Body: new MissingParamError('Name')
            }
        }
        if(!HttpRequest.Body.email) {
            return { 
                StatusCode: 400,
                Body: new MissingParamError('Email')
            }
        }
    }
}
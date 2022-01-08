import { HttpRequest, HttpResponse} from '../Protocols/Http'
import { MissingParamError } from '../Erros/Missing-param-error'
import { BadRequest } from '../Helpers/Http-helper'

export class SignUpController{
    handle (HttpRequest: HttpRequest): HttpResponse  {
        if(!HttpRequest.Body.name) {
            return BadRequest(new MissingParamError('Name'))
        }
        if(!HttpRequest.Body.email) {
            return BadRequest(new MissingParamError('Email'))
        }
    }
}
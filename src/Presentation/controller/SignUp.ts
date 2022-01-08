import { HttpRequest, HttpResponse} from '../Protocols/Http'
import { MissingParamError } from '../Erros/Missing-param-error'
import { BadRequest } from '../Helpers/Http-helper'

export class SignUpController{
    handle (HttpRequest: HttpRequest): HttpResponse  {
        const requiredFields = ['Name', 'Email', 'Password', 'PasswordConfirmation']

        for(let field of requiredFields) {
            if(!HttpRequest.Body[field]) {
                return BadRequest(new MissingParamError(field))
            }
        }
    }
}
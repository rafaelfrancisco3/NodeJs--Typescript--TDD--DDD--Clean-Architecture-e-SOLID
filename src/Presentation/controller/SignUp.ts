import { IHttpRequest, IHttpResponse} from '../Interfaces/IHttp'
import { MissingParamError } from '../Erros/Missing-param-error'
import { BadRequest } from '../Helpers/Http-helper'
import { IController } from '../Interfaces/IController'

export class SignUpController implements IController {
    handle (HttpRequest: IHttpRequest): IHttpResponse {
        const requiredFields = ['Name', 'Email', 'Password', 'PasswordConfirmation']

        for(let field of requiredFields) {
            if(!HttpRequest.Body[field]) {
                return BadRequest(new MissingParamError(field))
            }
        }
    }
}
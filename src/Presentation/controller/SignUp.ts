import { IHttpRequest, IHttpResponse} from '../Interfaces/IHttp'
import { MissingParamError } from '../Erros/Missing-param-error'
import { InvalidParamError } from '../Erros/Invalid-param-error'
import { IEmailValidator } from '../Interfaces/IEmailValidator'
import { IController } from '../Interfaces/IController'
import { BadRequest } from '../Helpers/Http-helper'

export class SignUpController implements IController {
    private readonly _emailValidator: IEmailValidator

    constructor (emailValidator: IEmailValidator) {
        this._emailValidator = emailValidator
    }

    Handle (HttpRequest: IHttpRequest): IHttpResponse {
        const requiredFields = ['Name', 'Email', 'Password', 'PasswordConfirmation']

        for(let field of requiredFields) {
            if(!HttpRequest.Body[field]) {
                return BadRequest(new MissingParamError(field))
            }
        }

        const isValid = this._emailValidator.IsValid(HttpRequest.Body.Email)
        if (!isValid) {
            return BadRequest(new InvalidParamError('Email'))
        }
    }
}
import { IController, IEmailValidator, IAddAccount, IHttpRequest, IHttpResponse } from './SignUpInterfaces'
import { MissingParamError, InvalidParamError } from '../../Erros'
import { BadRequest, InternalServerError, Ok } from '../../Helpers/Http-helper'

export class SignUpController implements IController {
    private readonly _emailValidator: IEmailValidator
    private readonly _addAccount: IAddAccount

    constructor(
        emailValidator: IEmailValidator,
        addAccount: IAddAccount) {
        this._emailValidator = emailValidator
        this._addAccount = addAccount
    }

    async Handle(HttpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const requiredFields = ['Name', 'Email', 'Password', 'PasswordConfirmation']

            for (let field of requiredFields) {
                if (!HttpRequest.Body[field]) {
                    return BadRequest(new MissingParamError(field))
                }
            }
            const { Name, Email, Password, PasswordConfirmation } = HttpRequest.Body
            if (Password !== PasswordConfirmation) {
                return BadRequest(new InvalidParamError("PasswordConfirmation"));
            }
            const isValid = this._emailValidator.IsValid(Email)
            if (!isValid) {
                return BadRequest(new InvalidParamError('Email'))
            }
            const account = await this._addAccount.Add({
                Email,
                Name,
                Password
            })

            return Ok(account)
        } catch (error) {
            return InternalServerError();
        }
    }
}
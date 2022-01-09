import { SignUpController } from './SignUp'
import { MissingParamError } from '../Erros/Missing-param-error'
import { InvalidParamError } from '../Erros/Invalid-param-error'
import { IEmailValidator } from '../Interfaces/IEmailValidator'
import { IController } from '../Interfaces/IController'

interface SutTypes {
    sut: IController,
    emailValidatorStub: IEmailValidator
}

const makeSut = (): SutTypes => {
    class EmailValidatorStub implements IEmailValidator {
        IsValid (email: string): boolean {
            return true
        }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provived', () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Email: 'any_email@mail.com',
                Password: 'any_password',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Name'));
    })
    test('Should return 400 if no email is provived', () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Password: 'any_password',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Email'));
    })
    test('Should return 400 if no Password is provived', () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Password'));
    })
    test('Should return 400 if no PasswordConfirmation is provived', () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                Password: 'any_password'
            }
        }
        const httpResponse = sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('PasswordConfirmation'));
    })
    test('Should return 400 if an invalid email is provived', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, "IsValid")
            .mockReturnValueOnce(false)
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'invalid_email@mail.com',
                PasswordConfirmation: 'any_password',
                Password: 'any_password'
            }
        }
        const httpResponse = sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new InvalidParamError('Email'));
    })
})
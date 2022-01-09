import { SignUpController } from './SignUp'
import { MissingParamError } from '../Erros/Missing-param-error'

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provived', () => {
        const sut = new SignUpController()
        const httpRequest = {
            Body: {
                Email: 'any_email@mail.com',
                Password: 'any_password',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Name'));
    })
    test('Should return 400 if no email is provived', () => {
        const sut = new SignUpController()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Password: 'any_password',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Email'));
    })
    test('Should return 400 if no Password is provived', () => {
        const sut = new SignUpController()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Password'));
    })
    test('Should return 400 if no PasswordConfirmation is provived', () => {
        const sut = new SignUpController()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                Password: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('PasswordConfirmation'));
    })
})
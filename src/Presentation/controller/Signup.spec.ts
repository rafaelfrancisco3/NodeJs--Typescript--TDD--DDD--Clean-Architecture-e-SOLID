import { SignUpController } from './SignUp'
describe('SignUp Controller', () => {
    test('Should return 400 if no name is provived', () => {
        const sut = new SignUpController()
        const httpRequest = {
            Body: {
                email: 'any_email@mail.com',
                Password: 'any_password',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new Error('Missing param: name'));
    })
    test('Should return 400 if no email is provived', () => {
        const sut = new SignUpController()
        const httpRequest = {
            Body: {
                name: 'any_password',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new Error('Missing param: email'));
    })
})
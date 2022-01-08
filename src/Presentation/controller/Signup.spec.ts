import { SignUpController } from './SignUp'
describe('SignUp Controller', () => {
    test('Should return 400 if no name is provived', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordconfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
    })
})
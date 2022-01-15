import { IController, IEmailValidator, IAddAccount, IAddAccountModel, IAccountModel } from '../SignUpInterfaces'
import { MissingParamError, InvalidParamError, ServerError } from '../../../Erros'
import { SignUpController } from '../SignUp'


interface SutTypes {
    sut: IController,
    emailValidatorStub: IEmailValidator,
    addAccountStub: IAddAccount
}
const makeEmailValidator = (): IEmailValidator => {
    class EmailValidatorStub implements IEmailValidator {
        IsValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeAddAccount = (): IAddAccount => {
    class AddAccountStub implements IAddAccount {
        async Add(account: IAddAccountModel): Promise<IAccountModel> {
            const fakeAccount = {
                Id: 'valid_id',
                Name: 'valid_name',
                Email: 'valid_email',
                Password: 'valid_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountStub()
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const addAccountStub = makeAddAccount()
    const sut = new SignUpController(emailValidatorStub, addAccountStub)
    return {
        sut,
        emailValidatorStub,
        addAccountStub
    }
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provived', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Email: 'any_email@mail.com',
                Password: 'any_password',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Name'));
    })
    test('Should return 400 if no email is provived', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Password: 'any_password',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Email'));
    })
    test('Should return 400 if no Password is provived', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('Password'));
    })
    test('Should return 400 if no PasswordConfirmation is provived', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                Password: 'any_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new MissingParamError('PasswordConfirmation'));
    })
    test('Should return 400 if an invalid email is provived', async () => {
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
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new InvalidParamError('Email'));
    })
    test('Should call emailValidator with currect email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, "IsValid")
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password',
                Password: 'any_password'
            }
        }
        await sut.Handle(httpRequest)
        expect(isValidSpy).toHaveBeenCalledWith(httpRequest.Body.Email);
    })
    test('Should return 500 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest
            .spyOn(emailValidatorStub, "IsValid")
            .mockImplementationOnce(() => { throw new Error() });
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password',
                Password: 'any_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(500);
        expect(httpResponse.Body).toEqual(new ServerError());
    })

    test('Should return 400 if password confirmation fails', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password',
                Password: 'invalid_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(400);
        expect(httpResponse.Body).toEqual(new InvalidParamError('PasswordConfirmation'));
    })

    test('Should call AddAccount with currect values', async () => {
        const { sut, addAccountStub } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'Add')
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password',
                Password: 'any_password'
            }
        }
        await sut.Handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            Name: 'any_password',
            Email: 'any_email@mail.com',
            Password: 'any_password'
        });
    })

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        jest
            .spyOn(addAccountStub, "Add")
            .mockImplementationOnce(async () => { return new Promise((resolve, reject) => reject(new Error())) });
        const httpRequest = {
            Body: {
                Name: 'any_password',
                Email: 'any_email@mail.com',
                PasswordConfirmation: 'any_password',
                Password: 'any_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(500);
        expect(httpResponse.Body).toEqual(new ServerError());
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            Body: {
                Name: 'valid_name',
                Email: 'valid_email',
                PasswordConfirmation: 'valid_password',
                Password: 'valid_password'
            }
        }
        const httpResponse = await sut.Handle(httpRequest)
        expect(httpResponse.StatusCode).toBe(200);
        expect(httpResponse.Body).toEqual({
            Id: 'valid_id',
            Name: 'valid_name',
            Email: 'valid_email',
            Password: 'valid_password'
        });
})
})
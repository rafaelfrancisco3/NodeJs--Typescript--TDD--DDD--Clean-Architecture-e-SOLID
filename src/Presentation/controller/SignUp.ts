export class SignUpController{
    handle (httpRequest: any): any {
        return {
            StatusCode: 400,
            Bory: new Error('Missing param: name')
        }
    }
}
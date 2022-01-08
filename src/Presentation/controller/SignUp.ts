import { HttpRequest, HttpResponse} from '../Protocols/Http'

export class SignUpController{
    handle (HttpRequest: HttpRequest): HttpResponse  {
        if(!HttpRequest.Body.name) {
            return { 
                StatusCode: 400,
                Body: new Error('Missing param: name')
            }
        }
        if(!HttpRequest.Body.email) {
            return { 
                StatusCode: 400,
                Body: new Error('Missing param: email')
            }
        }
    }
}
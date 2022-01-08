import { HttpResponse } from '../Protocols/Http'
export const BadRequest = (error: Error): HttpResponse => {
    return {
        StatusCode: 400,
        Body: error
    }
}
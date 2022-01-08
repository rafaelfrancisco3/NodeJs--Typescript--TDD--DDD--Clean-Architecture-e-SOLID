import { HttpResponse } from '../Protocols/Http'
export const BadRequest = (error: Error): HttpResponse => ({
        StatusCode: 400,
        Body: error
})
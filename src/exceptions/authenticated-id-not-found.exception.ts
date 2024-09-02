import { HttpException, HttpStatus } from "@nestjs/common"

export class AuthenticationIdNotFound extends HttpException {
    constructor(authenticationId: string) {
        super(`Authenticated ID not found: ${authenticationId}`, HttpStatus.NOT_FOUND)
    }
}
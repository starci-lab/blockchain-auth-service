import { HttpException, HttpStatus } from "@nestjs/common"

export class AuthKeyNotFound extends HttpException {
    constructor(key: string) {
        super(`Auth key not found: ${key}`, HttpStatus.NOT_FOUND)
    }
}


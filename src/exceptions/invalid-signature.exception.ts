import { HttpException, HttpStatus } from "@nestjs/common"

export class InvalidSignatureException extends HttpException {
    constructor(signature: string) {
        super(`Invalid signature: ${signature}`, HttpStatus.BAD_REQUEST)
    }
}
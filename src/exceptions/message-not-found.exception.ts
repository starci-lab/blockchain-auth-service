import { HttpException, HttpStatus } from "@nestjs/common"

export class MessageNotFound extends HttpException {
    constructor(message: string) {
        super(`Message not found: ${message}`, HttpStatus.NOT_FOUND)
    }
}
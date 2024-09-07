import { HttpException, HttpStatus } from "@nestjs/common"

export class InvalidJsonException extends HttpException {
    constructor(details: string) {
        super(`Invalid JSON: ${details}`, HttpStatus.BAD_REQUEST)
    }
}

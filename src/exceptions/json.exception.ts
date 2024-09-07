import { HttpException, HttpStatus } from "@nestjs/common"

export class InvalidJsonParseException extends HttpException {
    constructor(details: string) {
        super(`Invalid JSON format: ${details}`, HttpStatus.BAD_REQUEST)
    }
}

export class InvalidJsonStringifyException extends HttpException {
    constructor(details: string) {
        super(
            `Error converting object to JSON: ${details}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
}

import { HttpException, HttpStatus } from "@nestjs/common"

export class RetrieveIdNotFound extends HttpException {
    constructor(retrieveId: string) {
        super(`Retrieve id not found: ${retrieveId}`, HttpStatus.NOT_FOUND)
    }
}
import { HttpException, HttpStatus } from "@nestjs/common"

export class StorageDuplicateKeyException extends HttpException {
    constructor(key: string) {
        super(`Storage key duplicated: ${key}`, HttpStatus.CONFLICT)
    }
}

export class StorageNotFound extends HttpException {
    constructor(key: string) {
        super(`Storage key not found: ${key}`, HttpStatus.BAD_REQUEST)
    }
}


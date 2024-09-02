import { Chain } from "@/types"
import { HttpException, HttpStatus } from "@nestjs/common"

export class ChainNotSupportedException extends HttpException {
    constructor(chain: Chain) {
        super(`Chain not supported: ${chain}`, HttpStatus.NOT_FOUND)
    }
}

export class ChainNotFoundException extends HttpException {
    constructor(chain: string) {
        super(`Chain not found: ${chain}`, HttpStatus.BAD_REQUEST)
    }
}
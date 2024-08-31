import { Injectable, Logger } from "@nestjs/common"
import { AptosService, EvmService } from "../common"
import { Platform } from "@/types"
import { VerifyMessageRequestBody, VerifyMessageResponse } from "./dtos"

@Injectable()
export class VerificationControllerService {
    private readonly logger = new Logger(VerificationControllerService.name)

    constructor(
    private readonly evmService: EvmService,
    private readonly aptosService: AptosService,
    ) {}

    public verifyMessage({ message, signature, publicKey, platform }: VerifyMessageRequestBody) : VerifyMessageResponse {
        let result = false
        platform = platform ?? Platform.Evm
        switch (platform) {
        case Platform.Evm:
            result = this.evmService.verifyMessage({ message, signature, publicKey })
            break
        case Platform.Aptos:
            result = this.aptosService.verifyMessage({ message, signature, publicKey })
            break
        default:
            this.logger.error(`Unknown platform: ${platform}`)
            result = false
            break
        }
        return { 
            message: result ? "Success" : "Failed",
            data: { originMessage: message, result }
        }
    }
}
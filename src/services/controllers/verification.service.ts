import { Inject, Injectable, Logger } from "@nestjs/common"
import { AptosService, EvmService } from "../common"
import { Chain, chainToPlatform, Platform } from "@/types"
import { RequestMessageResponse, RetrieveRequestBody, RetrieveResponse, VerifyMessageRequestBody, VerifyMessageResponse } from "./dtos"
import { randomUUID } from "crypto"
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import { MessageNotFound, RetrieveIdNotFound } from "@/exceptions"

export interface RetrieveData {
    chain: Chain
}

@Injectable()
export class VerificationControllerService {
    private readonly logger = new Logger(VerificationControllerService.name)

    constructor(
    private readonly evmService: EvmService,
    private readonly aptosService: AptosService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    public async requestMessage(): Promise<RequestMessageResponse> {
        const message = randomUUID()
        await this.cacheManager.set(message, true)
        return {
            message: "Success",
            data: { 
                message
            },
        }
    }

    public async verifyMessage({
        message,
        signature,
        publicKey,
        chain,
    }: VerifyMessageRequestBody): Promise<VerifyMessageResponse> {
        const valid = await this.cacheManager.get(message)
        if (!valid) {
            throw new MessageNotFound(message)
        }
        await this.cacheManager.del(message)
        let result = false
        let address = publicKey
    
        chain = chain ?? Chain.Avalanche
        const platform = chainToPlatform(chain)
        switch (platform) {
        case Platform.Evm:
            result = this.evmService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            break
        case Platform.Aptos:
            result = this.aptosService.verifyMessage({
                message,
                signature,
                publicKey,
            })
            address = this.aptosService.toAddress(publicKey)
            break
        default:
            this.logger.error(`Unknown platform: ${platform}`)
            result = false
            break
        }
    
        const retrieveId = randomUUID()

        const data : RetrieveData = {
            chain
        }
        await this.cacheManager.set(retrieveId, data, 1000 * 60)
    
        return {
            message: result ? "Success" : "Failed",
            data: { result, address: result ? address : undefined, retrieveId },
        }
    }

    public async retrieve({
        retrieveId
    }: RetrieveRequestBody): Promise<RetrieveResponse> {
        const data = await this.cacheManager.get(retrieveId)
        if (!data) {
            throw new RetrieveIdNotFound(retrieveId)
        }
        const { chain } = data as RetrieveData
        await this.cacheManager.del(retrieveId)
    
        return {
            message: "Success",
            data: {
                chain
            },
        }
    }
}

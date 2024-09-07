import { Inject, Injectable, Logger } from "@nestjs/common"
import { AptosService, EvmService, Sha256Service } from "../../common"
import { AuthenticationData, Chain, chainToPlatform, Platform } from "@/types"
import {
    GetFakeSignatureResponse,
    GetFakeSignatureRequestBody,
    RequestMessageResponse,
    VerifyMessageRequestBody,
    VerifyMessageResponse,
} from "./dtos"
import { randomUUID } from "crypto"
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import {
    ChainNotSupportedException,
    InvalidSignatureException,
    MessageNotFound,
} from "@/exceptions"

@Injectable()
export class AuthenticatorControllerService {
    private readonly logger = new Logger(AuthenticatorControllerService.name)

    constructor(
    private readonly evmService: EvmService,
    private readonly aptosService: AptosService,
    private readonly sha256Service: Sha256Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    public async requestMessage(): Promise<RequestMessageResponse> {
        const message = randomUUID()
        //tempt inf for testing
        await this.cacheManager.set(message, true, 0)
        return {
            message: "Success",
            data: {
                message,
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
        //await this.cacheManager.del(message)
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
        if (!result) throw new InvalidSignatureException(signature)

        const authenticationId = this.sha256Service.hash(
            JSON.stringify({
                address,
                chain,
            }),
        )
        const data: AuthenticationData = {
            chain,
            address,
        }
        await this.cacheManager.set(authenticationId, data, 1000 * 60 * 3)

        return {
            message: result ? "Success" : "Failed",
            data: { result, authenticationId, address },
        }
    }

    public async getFakeSignature({
        accountNumber,
        chain,
    }: GetFakeSignatureRequestBody): Promise<GetFakeSignatureResponse> {
        const {
            data: { message },
        } = await this.requestMessage()
        chain = chain ?? Chain.Avalanche
        accountNumber = accountNumber ?? 0

        const platform = chainToPlatform(chain)
        switch (platform) {
        case Platform.Evm: {
            const { privateKey, address } =
          this.evmService.getFakeKeyPair(accountNumber)
            const signature = this.evmService.signMessage(message, privateKey)
            return {
                message: "Success",
                data: {
                    message,
                    publicKey: address,
                    signature,
                    chain: Chain.Avalanche,
                },
            }
        }
        default:
            throw new ChainNotSupportedException(chain)
        }
    }
}

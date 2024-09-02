import { SignedMessage } from "@/types"
import { Injectable, Logger } from "@nestjs/common"
import { verifyMessage as _verifyMessage, Wallet } from "ethers"

@Injectable()
export class EvmService {
    private readonly logger = new Logger(EvmService.name)
    constructor() {}

    public verifyMessage({ message, signature, publicKey }: Omit<SignedMessage, "chainName">) {
        try {
            return _verifyMessage(message, signature) === publicKey
        } catch (ex) {
            this.logger.error(ex)   
            return false
        }
    }

    public signMessage(message: string, privateKey: string) {
        const account = new Wallet(privateKey)
        return account.signMessageSync(message)
    }

    public getRandomKeyPair() {
        return Wallet.createRandom()
    }
}
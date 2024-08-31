import { SignedMessage } from "@/types"
import {
    Account,
    Ed25519PrivateKey,
    Ed25519PublicKey,
    Ed25519Signature,
} from "@aptos-labs/ts-sdk"
import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class AptosService {
    private readonly logger = new Logger(AptosService.name)
    constructor() {}

    public verifyMessage({ message, signature, publicKey }: Omit<SignedMessage, "chainName">) {
        try {
            const ed25519PublicKey = new Ed25519PublicKey(publicKey)
            const result = ed25519PublicKey.verifySignature({
                message,
                signature: new Ed25519Signature(signature),
            })
            return !!result
        } catch (ex) {
            this.logger.error(ex)
            return false
        } 
    }

    public signMessage(message: string, privateKey: string) {
        const ed25519PrivateKey = Account.fromPrivateKey({
            privateKey: new Ed25519PrivateKey(privateKey)
        })
        return ed25519PrivateKey.sign(message).toString()
    }

    public toAddress(publicKey: string) {
        return new Ed25519PublicKey(publicKey).authKey().toString()
    }
}
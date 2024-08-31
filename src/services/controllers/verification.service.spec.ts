import { Test } from "@nestjs/testing"
import { envConfig } from "@/config"
import { ConfigModule } from "@nestjs/config"
import { VerificationControllerService } from "./verification.service"
import { AptosService, CommonModule, EvmService } from "../common"
import { Account } from "@aptos-labs/ts-sdk"
import { Platform } from "@/types"
import { Wallet } from "ethers"

describe("VerificationControllerService", () => {
    let service: VerificationControllerService
    let aptosService: AptosService
    let evmService: EvmService

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    load: [envConfig],
                    isGlobal: true,
                }),
                CommonModule,
            ],
            providers: [ VerificationControllerService ]
        }).compile()

        service = module.get(VerificationControllerService)
        aptosService = module.get(AptosService)
        evmService = module.get(EvmService)
    })

    describe("test verifyMessage", () => {
        it("should verifyMessage on Aptos sucessfully", async () => {
            const message = "hello world"
            const { privateKey, publicKey } = Account.generate()
            const signature = aptosService.signMessage(message, privateKey.toString())
            const result = service.verifyMessage({ message, signature, publicKey: publicKey.toString(), platform: Platform.Aptos })
            expect(result.data.result).toBe(true)
        })
        it("should verifyMessage on Evm sucessfully", async () => {
            const message = "hello world"
            const { privateKey, address } = Wallet.createRandom()
            const signature = evmService.signMessage(message, privateKey)
            const result = service.verifyMessage({ message, signature, publicKey: address, platform: Platform.Evm })
            expect(result.data.result).toBe(true)
        })
        it("should verifyMessage on Aptos failed", async () => {
            const message = "hello world"
            const { privateKey, publicKey } = Account.generate()
            const signature = aptosService.signMessage(message, privateKey.toString())
            const result = service.verifyMessage({ message, signature: `${signature}x` , publicKey: publicKey.toString(), platform: Platform.Aptos })
            expect(result.data.result).toBe(false)
        })
        it("should verifyMessage on Evm failed", async () => {
            const message = "hello world"
            const { privateKey, publicKey } = Account.generate()
            const signature = evmService.signMessage(message, privateKey.toString())
            const result = service.verifyMessage({ message, signature: `${signature}x`, publicKey: publicKey.toString(), platform: Platform.Evm })
            expect(result.data.result).toBe(false)
        })
    })
})

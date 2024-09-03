import { AptosService } from "./aptos.service"
import { Global, Module } from "@nestjs/common"
import { EvmService } from "./evm.service"
import { Sha256Service } from "./sha256.service"

@Global()
@Module({
    imports: [],
    providers: [
        AptosService,
        EvmService,
        Sha256Service
    ],
    exports: [
        AptosService,
        EvmService,
        Sha256Service
    ]
})
export class CommonModule {}

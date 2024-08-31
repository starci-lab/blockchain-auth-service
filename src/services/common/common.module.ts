import { AptosService } from "./aptos.service"
import { Global, Module } from "@nestjs/common"
import { EvmService } from "./evm.service"

@Global()
@Module({
    imports: [],
    providers: [
        AptosService,
        EvmService
    ],
    exports: [
        AptosService,
        EvmService
    ]
})
export class CommonModule {}

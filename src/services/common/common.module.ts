import { AptosService } from "./aptos.service"
import { Global, Module } from "@nestjs/common"
import { EvmService } from "./evm.service"
import { Sha256Service } from "./sha256.service"
import { JsonParserService } from "./json-parser.service"

@Global()
@Module({
    imports: [],
    providers: [
        AptosService,
        EvmService,
        Sha256Service,
        JsonParserService
    ],
    exports: [
        AptosService,
        EvmService,
        Sha256Service,
        JsonParserService
    ]
})
export class CommonModule {}

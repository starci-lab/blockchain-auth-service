import { AptosService } from "./aptos.service"
import { Global, Module } from "@nestjs/common"
import { EvmService } from "./evm.service"
import { Sha256Service } from "./sha256.service"
import { JsonService } from "./json.service"
import { IpfsService } from "./ipfs.service"

@Global()
@Module({
    imports: [],
    providers: [
        AptosService,
        EvmService,
        Sha256Service,
        JsonService,
        IpfsService
    ],
    exports: [
        AptosService,
        EvmService,
        Sha256Service,
        JsonService,
        IpfsService
    ]
})
export class CommonModule {}

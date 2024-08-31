import { Global, Module } from "@nestjs/common"
import { VerificationControllerService } from "./verification.service"

@Global()
@Module({
    imports: [
    ],
    providers: [
        VerificationControllerService
    ],
    exports: [
        VerificationControllerService
    ]
})
export class ControllersModule {}

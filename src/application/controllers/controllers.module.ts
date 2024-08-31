import { Module } from "@nestjs/common"
import { VerificationController } from "./verification.controller"

@Module({
    imports: [
    ],
    controllers: [
        VerificationController
    ],
})
export class ControllersModule {}

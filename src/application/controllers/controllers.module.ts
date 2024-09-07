import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { StorageController } from "./storage.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        StorageController
    ],
})
export class ControllersModule {}

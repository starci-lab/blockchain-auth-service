import { Module } from "@nestjs/common"
import { AuthenticatorController } from "./authenticator.controller"
import { StorageController } from "./storage.controller"
import { IpfsController } from "./ipfs.controller"

@Module({
    imports: [
    ],
    controllers: [
        AuthenticatorController,
        StorageController,
        IpfsController
    ],
})
export class ControllersModule {}

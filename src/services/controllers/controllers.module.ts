import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { StorageControllerService } from "./storage"
import { MongooseModule } from "@nestjs/mongoose"
import { StorageSchema } from "@/database"

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: StorageSchema.name, schema: StorageSchema },
        ]),
    ],
    providers: [AuthenticatorControllerService, StorageControllerService],
    exports: [AuthenticatorControllerService, StorageControllerService],
})
export class ControllersModule {}

import { Global, Module } from "@nestjs/common"
import { AuthenticatorControllerService } from "./authenticator"
import { StorageControllerService } from "./storage"
import { MongooseModule } from "@nestjs/mongoose"
import { StorageSchema, StorageSchemaClass } from "@/database"
import { IpfsControllerService } from "./ifps"

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: StorageSchema.name, schema: StorageSchemaClass },
        ]),
    ],
    providers: [
        AuthenticatorControllerService,
        StorageControllerService,
        IpfsControllerService,
    ],
    exports: [
        AuthenticatorControllerService,
        StorageControllerService,
        IpfsControllerService,
    ],
})
export class ControllersModule {}

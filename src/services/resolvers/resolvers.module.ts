import { AuthenticatorResolverService } from "./authenticator.service"
import { Global, Module } from "@nestjs/common"

@Global()
@Module({
    imports: [
    ],
    providers: [
        AuthenticatorResolverService
    ],
    exports: [
        AuthenticatorResolverService
    ]
})
export class ResolversModule {}

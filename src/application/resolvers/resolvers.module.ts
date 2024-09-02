
import { Module } from "@nestjs/common"
import { AuthenticatorResolver } from "./authenticator.resolver"

@Module({
    imports: [],
    providers: [ AuthenticatorResolver ],
})
export class ResolversModule {}


import { Inject, Injectable, Logger } from "@nestjs/common"
import { GetAuthenticationDataInput } from "./dtos"
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager"
import { AuthenticationIdNotFound } from "@/exceptions"
import { AuthenticationData } from "@/types"

@Injectable()
export class AuthenticatorResolverService {
    private readonly logger = new Logger(AuthenticatorResolverService.name)

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    public async getAuthenticationData({ authenticationId }: GetAuthenticationDataInput): Promise<AuthenticationData> {
        const data = await this.cacheManager.get(authenticationId) as AuthenticationData
        if (!data) {
            throw new AuthenticationIdNotFound(authenticationId)
        }

        return data
    }
}


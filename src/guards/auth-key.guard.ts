import { GqlExecutionContext } from "@nestjs/graphql"
import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common"
import { envConfig } from "@/config"
import { AuthKeyNotFound } from "@/exceptions"

export const AUTH_KEY = "auth-key"
@Injectable()
export class AuthKeyGuard implements CanActivate {
    constructor() {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext()
        const authKey = ctx.req.headers[AUTH_KEY]
        if (authKey != envConfig().defaultAuthKey) throw new AuthKeyNotFound(authKey)
        return true
    }
}

import {
    AuthenticatorResolverService,
    GetAuthenticationDataInput,
} from "@/services"
import { AuthenticationData } from "@/types"

import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver()
export class AuthenticatorResolver {
    constructor(
    private readonly authenticatorService: AuthenticatorResolverService,
    ) {}

  @Query(() => AuthenticationData, {
      name: "authenticationData",
      nullable: true,
  })
    async getAuthenticationData(
    @Args("input") input: GetAuthenticationDataInput,
    ) {
        return await this.authenticatorService.getAuthenticationData(input)
    }
}

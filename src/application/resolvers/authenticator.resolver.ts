import {
    AuthenticatorResolverService,
    GetAuthenticationDataInput,
    GetAuthenticationDataResult,
} from "@/services"
import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver()
export class AuthenticatorResolver {
    constructor(
    private readonly authenticatorResolverService: AuthenticatorResolverService,
    ) {}

  @Query(() => GetAuthenticationDataResult, {
      name: "authenticationData",
      nullable: true,
  })
    async getAuthenticationData(
    @Args("input") input: GetAuthenticationDataInput,
    ) {
        return await this.authenticatorResolverService.getAuthenticationData(input)
    }
}

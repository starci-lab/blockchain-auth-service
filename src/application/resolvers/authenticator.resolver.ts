import {
    AuthenticatorResolverService,
    GetAuthenticationDataInput,
    GetAuthenticationDataResult,
} from "@/services"
import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver()
export class AuthenticatorResolver {
    constructor(
    private readonly authenticatorService: AuthenticatorResolverService,
    ) {}

  @Query(() => GetAuthenticationDataResult, {
      name: "authenticationData",
      nullable: true,
  })
    async getAuthenticationData(
    @Args("input") input: GetAuthenticationDataInput,
    ) {
        return await this.authenticatorService.getAuthenticationData(input)
    }
}

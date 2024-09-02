import { IsNotEmpty } from "class-validator"
import { Chain } from "./base.type"
import { ObjectType, Field } from "@nestjs/graphql"

@ObjectType()
export class AuthenticationData {
  @IsNotEmpty()
  @Field(() => String, {
      name: "chain",
  })
      chain: Chain
  @IsNotEmpty()
  @Field(() => String, {
      name: "address",
  })
      address: string
}

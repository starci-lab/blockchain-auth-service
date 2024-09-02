import { Chain } from "@/types"
import { InputType, Field, ObjectType } from "@nestjs/graphql"
import { IsNotEmpty, IsUUID } from "class-validator"

@InputType()
export class GetAuthenticationDataInput {
    @IsUUID("4")
    @Field(() => String, {
        name: "authenticationId",
    })
        authenticationId: string
}

@ObjectType()
export class GetAuthenticationDataResult {
    @IsNotEmpty()
    @Field(() => String, {
        name: "chain",
    })
        chain: Chain
}
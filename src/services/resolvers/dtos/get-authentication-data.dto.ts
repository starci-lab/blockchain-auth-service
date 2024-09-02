import { InputType, Field, ID } from "@nestjs/graphql"
import { IsUUID } from "class-validator"

@InputType()
export class GetAuthenticationDataInput {
    @IsUUID("4")
    @Field(() => ID, {
        name: "authenticationId",
    })
        authenticationId: string
}
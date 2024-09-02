import { InputType, Field } from "@nestjs/graphql"
import { IsUUID } from "class-validator"

@InputType()
export class GetAuthenticationDataInput {
    @IsUUID("4")
    @Field(() => String, {
        name: "authenticationId",
    })
        authenticationId: string
}
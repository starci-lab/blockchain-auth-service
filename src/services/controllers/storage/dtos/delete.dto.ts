import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Response } from "@/types"

export class DeleteParams {
    @IsString()
    @ApiProperty({ example: "exampleKey" })
        key: string
}

export class DeleteResponse implements Response {
    @ApiProperty({ example: "Success" })
        message: string
}
import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class DeleteRequestBody {
    @IsString()
    @ApiProperty({ example: "exampleKey" })
        key: string
}

export class DeleteResponse {
    @ApiProperty({ example: "Success" })
        message: string
}
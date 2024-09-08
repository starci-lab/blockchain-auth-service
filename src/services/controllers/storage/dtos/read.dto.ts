import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class ReadParams {
    @IsString()
    @ApiProperty({ example: "exampleKey" })
        key: string
}
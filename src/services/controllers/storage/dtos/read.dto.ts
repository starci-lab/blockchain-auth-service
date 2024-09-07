import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class ReadRequestBody {
    @IsString()
    @ApiProperty({ example: "exampleKey" })
        key: string
}
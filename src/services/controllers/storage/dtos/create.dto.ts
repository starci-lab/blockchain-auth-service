import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Response } from "@/types"

export class CreateRequestBody {
    @IsString()
    @ApiProperty({ example: "exampleKey" })
        storageKey: string
    @ApiProperty({ example: JSON.stringify({hello: "world"}) })
        data: string
}

export class CreateResponseData {
    @ApiProperty({ example: "507f1f77bcf86cd799439011" })
        objectId: string
}

export class CreateResponse implements Response<CreateResponseData> {
    @ApiProperty({ example: "Success" })
        message: string
    @ApiProperty({
        example: {
            objectId: "507f1f77bcf86cd799439011",
        },
    })
        data: CreateResponseData
}
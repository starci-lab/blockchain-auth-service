import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Response } from "@/types"

export class WriteRequestBody {
    @IsString()
    @ApiProperty({ example: "exampleKey" })
        key: string
    @ApiProperty({ example: JSON.stringify({hello: "world"}) })
        data: string
}

export class WriteResponseData {
    @ApiProperty({ example: "507f1f77bcf86cd799439011" })
        objectId: string
}

export class WriteResponse implements Response<WriteResponseData> {
    @ApiProperty({ example: "Success" })
        message: string
    @ApiProperty({
        example: {
            objectId: "507f1f77bcf86cd799439011",
        },
    })
        data: WriteResponseData
}
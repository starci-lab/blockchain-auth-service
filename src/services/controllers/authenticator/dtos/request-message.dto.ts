import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"
import { Response } from "@/types"

export class RequestMessageResponseData {
    @IsUUID(4)
    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
        message: string
}
  
export class RequestMessageResponse implements Response<RequestMessageResponseData> {
    @ApiProperty({ example: "Success" })
        message: string
    @ApiProperty({
        example: {
            message: "550e8400-e29b-41d4-a716-446655440000",
        },
    })
        data: RequestMessageResponseData
}
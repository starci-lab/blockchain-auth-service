import { Response, Chain } from "@/types"
import { ApiProperty } from "@nestjs/swagger"
import {
    IsString,
    IsUUID,
} from "class-validator"

export class RetrieveRequestBody {
    @IsUUID(4)
    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
        retrieveId: string
}

export class RetrieveResponseData {
  @IsString()
  @ApiProperty({ example: Chain.Avalanche })
      chain: Chain
}

export class RetrieveResponse
implements Response<RetrieveResponseData>
{
  @ApiProperty({ example: "Success" })
      message: string
  @ApiProperty({
      example: {
          chain: Chain.Avalanche,
      },
  })
      data: RetrieveResponseData
}

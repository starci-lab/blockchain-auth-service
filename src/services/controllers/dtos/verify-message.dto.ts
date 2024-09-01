import { SignedMessage, Response, Chain } from "@/types"
import { ApiProperty } from "@nestjs/swagger"
import {
    IsBoolean,
    IsHexadecimal,
    IsNotEmpty,
    IsOptional,
    IsUUID,
} from "class-validator"

export class VerifyMessageRequestBody implements SignedMessage {
  @IsNotEmpty()
  @ApiProperty({ example: "hello world" })
      message: string
  @IsHexadecimal()
  @ApiProperty({ example: "0xD9a49b9c8df1b8Be5Ef7770EE328650B0Bcf6345" })
      publicKey: string
  @IsHexadecimal()
  @ApiProperty({
      example:
      "0x62cc52b62e31d82925e36747ed8229b583d34f2dce52dee3dcc4664c25c58cfa13f8cc15ed0bfb834646069d649ade99d12b3a67fa6a469a27b77baeaffd8b991b",
  })
      signature: string
  @IsOptional()
  @ApiProperty({ example: Chain.Avalanche })
      chain?: Chain
}

export class VerifyMessageResponseData {
  @IsBoolean()
  @ApiProperty({ example: true })
      result: boolean
  @IsHexadecimal()
  @IsOptional()
  @ApiProperty({ example: "0xD9a49b9c8df1b8Be5Ef7770EE328650B0Bcf6345" })
      address?: string
  @IsUUID(4)
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
      retrievedId: string
}

export class VerifyMessageResponse
implements Response<VerifyMessageResponseData>
{
  @ApiProperty({ example: "Success" })
      message: string
  @ApiProperty({
      example: {
          result: true,
          address: "0xD9a49b9c8df1b8Be5Ef7770EE328650B0Bcf6345",
          retrievedId: "550e8400-e29b-41d4-a716-446655440000",
      },
  })
      data: VerifyMessageResponseData
}

import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Response } from "@/types"

export class RemoveParams {
  @IsString()
  @ApiProperty({ example: "QmXoYPsD3zWgT5T12mL3Q4V5Er4jUvGdfmXHq1kZG4mZjp" }) // Updated example
      cid: string
}


export class RemoveResponse implements Response {
  @ApiProperty({ example: "Remove successfully" })
      message: string
}

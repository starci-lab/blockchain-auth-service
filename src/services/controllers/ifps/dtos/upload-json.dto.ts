import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Response } from "@/types"

export class UploadJsonRequestBody {
  @IsString()
  @ApiProperty({ example: "{\"key\": \"value\"}" }) // Updated example
      jsonString: string
}

export class UploadJsonResponseData {
  @ApiProperty({ example: "QmXoYPsD3zWgT5T12mL3Q4V5Er4jUvGdfmXHq1kZG4mZjp" })
      cid: string
}

export class UploadJsonResponse implements Response<UploadJsonResponseData> {
  @ApiProperty({ example: "Uploaded successfully" })
      message: string
  @ApiProperty({
      example: {
          cid: "QmXoYPsD3zWgT5T12mL3Q4V5Er4jUvGdfmXHq1kZG4mZjp",
      },
  })
      data: UploadJsonResponseData
}

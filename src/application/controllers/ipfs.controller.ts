import {
    IpfsControllerService,
    UploadJsonResponse,
    UploadJsonRequestBody,
    RemoveResponse,
} from "@/services"
import {
    Body,
    Controller,
    Delete,
    HttpStatus,
    Logger,
    Param,
    Post,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("IPFS")
@Controller("api/v1/ipfs")
export class IpfsController {
    private readonly logger = new Logger(IpfsController.name)
    constructor(private readonly ipfsService: IpfsControllerService) {}

  @ApiResponse({ type: UploadJsonResponse })
  @Post("/json")
    public async uploadJson(@Body() body: UploadJsonRequestBody) {
        return await this.ipfsService.uploadJson(body)
    }

  @ApiResponse({ type: RemoveResponse, status: HttpStatus.OK })
  @Delete(":cid")
  public async remove(@Param("cid") cid: string): Promise<RemoveResponse> {
      return await this.ipfsService.remove({ cid })
  }
}

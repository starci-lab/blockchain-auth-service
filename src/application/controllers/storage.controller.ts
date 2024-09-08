import { AuthKeyGuard } from "@/guards"
import {
    WriteRequestBody,
    WriteResponse,
    StorageControllerService,
    DeleteResponse,
} from "@/services"
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Logger,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@UseGuards(AuthKeyGuard)
@ApiTags("Storage")
@Controller("api/v1/storage")
export class StorageController {
    private readonly logger = new Logger(StorageController.name)
    constructor(private readonly storageService: StorageControllerService) {}
    
  @Get(":key")
    public async read(@Param("key") key: string): Promise<unknown> {
        return await this.storageService.read({ key })
    }
    
  @ApiResponse({ type: WriteResponse })
  @Post()
  public async write(@Body() body: WriteRequestBody) {
      return await this.storageService.write(body)
  }

  @ApiResponse({ type: DeleteResponse, status: HttpStatus.OK })
  @Delete(":key")
  public async delete(@Param("key") key: string): Promise<DeleteResponse> {
      return await this.storageService.delete({ key })
  }
}

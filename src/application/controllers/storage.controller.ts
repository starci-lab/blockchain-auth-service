import {
    CreateRequestBody,
    CreateResponse,
    StorageControllerService,
} from "@/services"
import {
    Body,
    Controller,
    Logger,
    Post,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Storage")
@Controller("api/v1/storage")
export class StorageController {
    private readonly logger = new Logger(StorageController.name)
    constructor(
    private readonly storageService: StorageControllerService,
    ) {}

  @ApiResponse({ type: CreateResponse, status: 200 })
  @Post()
    public async create(@Body() body: CreateRequestBody) {
        return await this.storageService.create(body)
    }
}
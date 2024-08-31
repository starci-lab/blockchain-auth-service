import { VerificationControllerService } from "@/services"
import { VerifyMessageRequestBody, VerifyMessageResponse } from "@/services/controllers/dtos"
import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Verification")
@Controller("api/v1/verification")
export class VerificationController {
    private readonly logger = new Logger(VerificationController.name)
    constructor(
        private readonly verificationService: VerificationControllerService
    ) {}

    @HttpCode(HttpStatus.OK)
    @ApiResponse({ type: VerifyMessageResponse, status: 200 })
    @Post()
    public verifyMessage(@Body() body: VerifyMessageRequestBody) {
        return this.verificationService.verifyMessage(body)
    }
}
import { AuthenticatorControllerService } from "@/services"
import { RequestMessageResponse, VerifyMessageRequestBody, VerifyMessageResponse } from "@/services"
import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Authenticator")
@Controller("api/v1/authenticator")
export class AuthenticatorController {
    private readonly logger = new Logger(AuthenticatorController.name)
    constructor(
        private readonly authenticatorService: AuthenticatorControllerService
    ) {}

    @HttpCode(HttpStatus.OK)
    @ApiResponse({ type: VerifyMessageResponse, status: 200 })
    @Post("verify-message")
    public async verifyMessage(@Body() body: VerifyMessageRequestBody) {
        return await this.authenticatorService.verifyMessage(body)
    }

    @HttpCode(HttpStatus.OK)
    @ApiResponse({ type: RequestMessageResponse, status: 200 })
    @Post("request-message")
    public async requestMessage() {
        return await this.authenticatorService.requestMessage()
    }
}
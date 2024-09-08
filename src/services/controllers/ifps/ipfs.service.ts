import { IpfsService, JsonService } from "../../common"
import { Injectable, Logger } from "@nestjs/common"
import { RemoveParams, RemoveResponse, UploadJsonRequestBody, UploadJsonResponse } from "./dtos"

@Injectable()
export class IpfsControllerService {
    private readonly logger = new Logger(IpfsControllerService.name)
    constructor(private readonly ipfsService: IpfsService,
        private readonly jsonService: JsonService
    ) {}

    public async uploadJson({ jsonString }: UploadJsonRequestBody) : Promise<UploadJsonResponse> {
        const json = this.jsonService.parse(jsonString) as Record<string, unknown>
        const cid = await this.ipfsService.addJson(json)
        await this.ipfsService.pin(cid)
        return {
            message: "Uploaded successfully",
            data: {
                cid
            }
        }
    }

    public async remove({ cid }: RemoveParams) : Promise<RemoveResponse> {
        await this.ipfsService.unpin(cid)
        return {
            message: "Remove successfully"
        }
    }
}

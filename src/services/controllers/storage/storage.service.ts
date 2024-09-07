import { StorageSchema } from "@/database"
import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { CreateRequestBody, CreateResponse } from "./dtos"

@Injectable()
export class StorageControllerService {
    private readonly logger = new Logger(StorageControllerService.name)

    constructor(
        @InjectModel(StorageSchema.name) 
        private readonly storageSchemaModel : Model<StorageSchema>
    ) {}

    async create({ data, storageKey }: CreateRequestBody): Promise<CreateResponse> {
        const createdCat = await this.storageSchemaModel.create({
            data: JSON.parse(data),
            key: storageKey,
        })
        return {
            message: "Success",
            data: {
                objectId: createdCat._id.toHexString(),
            }
        }
    }
}
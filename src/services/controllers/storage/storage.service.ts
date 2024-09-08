import { StorageSchema } from "@/database"
import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { WriteResponse, WriteRequestBody, DeleteParams, DeleteResponse, ReadParams } from "./dtos"
import { JsonService } from "../../common"
import { StorageNotFound } from "@/exceptions"

@Injectable()
export class StorageControllerService {
    private readonly logger = new Logger(StorageControllerService.name)

    constructor(
        @InjectModel(StorageSchema.name) 
        private readonly storageSchemaModel : Model<StorageSchema>,
        private readonly jsonService: JsonService
    ) {}

    async write({ data, key }: WriteRequestBody): Promise<WriteResponse> {
        const parsed = this.jsonService.parse(data)

        const created = await this.storageSchemaModel.findOneAndUpdate(
            { key: key},
            {
                data: parsed,
                key: key,
            }, {
                new: true,
                upsert: true
            })
        return {
            message: "Storage successfully created or updated.",
            data: {
                objectId: created._id.toHexString(),
            }
        }  
    }

    async delete({ key }: DeleteParams): Promise<DeleteResponse> {
        const found = await this.storageSchemaModel.findOne({
            key,
        })
        if (!found) throw new StorageNotFound(key)
            
        await this.storageSchemaModel.deleteOne(
            { _id: found._id }
        )
        return {
            message: `Storage with key '${key}' successfully deleted.`,
        }    
    }

    async read({ key }: ReadParams): Promise<unknown> {
        const found = await this.storageSchemaModel.findOne({
            key,
        })
        if (!found) throw new StorageNotFound(key)
        return found.data
    }
}
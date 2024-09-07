import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type StorageDocument = HydratedDocument<StorageSchema>;

@Schema()
export class StorageSchema {
    @Prop({ required: true })
        data: object

      @Prop({ required: true, type: Date })
          createdAt: number

      @Prop({ required: true, type: Date })
          updatedAt: string
}

export const CatSchema = SchemaFactory.createForClass(StorageSchema)
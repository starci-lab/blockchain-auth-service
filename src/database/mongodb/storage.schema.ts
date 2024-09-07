import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type StorageDocument = HydratedDocument<Storage>;

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    collection: "storage"
})
export class StorageSchema {
  @Prop({ type: String, required: true, unique: true })
      key: string
  @Prop({ type: Object, required: true })
      data: object
}

export const StorageSchemaClass = SchemaFactory.createForClass(StorageSchema)

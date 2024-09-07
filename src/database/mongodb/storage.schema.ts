import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type StorageDocument = HydratedDocument<Storage>;

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
})
export class StorageSchema {
  @Prop({ required: true, unique: true })
      key: string
  @Prop({ required: true })
      data: object
}

export const StorageSchemaClass = SchemaFactory.createForClass(StorageSchema)

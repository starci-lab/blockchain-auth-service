export * from "./storage.schema"

export interface MongooseError {
  code: number;
}

export enum MongooseErrorCode {
  DuplicateKeyError = 11000,
}

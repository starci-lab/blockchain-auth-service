import {
    InvalidJsonParseException,
    InvalidJsonStringifyException,
} from "@/exceptions"
import { Injectable, Logger } from "@nestjs/common"
import { split } from "lodash"

@Injectable()
export class JsonService {
    private readonly logger = new Logger(JsonService.name)

    parse<TResult = unknown>(jsonString: string): TResult {
        try {
            return JSON.parse(jsonString)
        } catch (ex: unknown) {
            this.logger.error(ex)
            throw new InvalidJsonParseException(split(ex.toString(), ": ").at(1))
        }
    }

    stringify(obj: Record<string, unknown>): string {
        try {
            return JSON.stringify(obj)
        } catch (ex: unknown) {
            this.logger.error(ex)
            throw new InvalidJsonStringifyException(ex.toString())
        }
    }
}

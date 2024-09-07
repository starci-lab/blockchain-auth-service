import { InvalidJsonException } from "@/exceptions"
import { Injectable, Logger } from "@nestjs/common"
import { split } from "lodash"

@Injectable()
export class JsonParserService {
    private readonly logger = new Logger(JsonParserService.name)

    parse<TResult = unknown>(jsonString: string): TResult {
        try {
            return JSON.parse(jsonString)
        } catch (ex: unknown) {
            this.logger.error(ex)
            throw new InvalidJsonException(split(ex.toString(), ": ").at(1))
        }
    }
}

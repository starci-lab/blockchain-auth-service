import { envConfig } from "@/config"
import { Injectable } from "@nestjs/common"
import { createHash } from "crypto"

@Injectable()
export class Sha256Service {
    constructor(){}

    public hash(input: string): string {
        const hash = createHash("sha256")
        hash.update(input + envConfig().salt)
        return hash.digest("hex")
    }
}
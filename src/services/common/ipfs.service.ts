import { envConfig } from "@/config"
import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { KuboRPCClient, create } from "kubo-rpc-client"

@Injectable()
export class IpfsService implements OnModuleInit {
    private readonly logger = new Logger(IpfsService.name)
    constructor() {}

    private client: KuboRPCClient
    onModuleInit() {
        this.client = create(envConfig().ipfsUrl)
    }

    async addJson(json: Record<string, unknown>) {
        try {
            const { cid } = await this.client.add(JSON.stringify(json))
            return cid.toString()
        } catch (ex) {
            this.logger.error(ex)
            throw ex
        }
    }

    async pin(cid: string) {
        try {
            await this.client.pin.add(cid)
        } catch (ex) {
            this.logger.error(ex)
            throw ex
        }
    }

    async unpin(cid: string) {
        try {
            await this.client.pin.rm(cid)
        } catch (ex) {
            this.logger.error(ex)
            throw ex
        }
    }
}
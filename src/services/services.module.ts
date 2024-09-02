import { CommonModule } from "./common"
import { ControllersModule } from "./controllers"
import { Module } from "@nestjs/common"
import { ResolversModule } from "./resolvers"

@Module({
    imports: [
        CommonModule,
        ControllersModule,
        ResolversModule
    ],
})
export class ServicesModule {}

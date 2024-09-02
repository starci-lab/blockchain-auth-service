import { ControllersModule } from "./controllers"
import { Module } from "@nestjs/common"
import { ResolversModule } from "./resolvers"

@Module({
    imports: [
        ControllersModule,
        ResolversModule
    ],
})
export class ApplicationModule {}

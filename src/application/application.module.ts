import { ControllersModule } from "./controllers"
import { Module } from "@nestjs/common"

@Module({
    imports: [
        ControllersModule
    ],
})
export class ApplicationModule {}

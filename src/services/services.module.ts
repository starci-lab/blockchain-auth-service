import { CommonModule } from "./common"
import { ControllersModule } from "./controllers"
import { Module } from "@nestjs/common"

@Module({
    imports: [
        CommonModule,
        ControllersModule
    ],
})
export class ServicesModule {}

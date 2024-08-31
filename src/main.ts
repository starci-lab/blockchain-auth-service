import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { envConfig } from "config/env.config"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

const bootstrap = async () => {

    const app = await NestFactory.create(AppModule)
    app.enableCors()

    const config = new DocumentBuilder()
        .setVersion("1.0")
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api", app, document)

    await app.listen(envConfig().port)
}

bootstrap()

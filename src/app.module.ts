import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { envConfig } from "@/config"
import { APP_PIPE } from "@nestjs/core"
import { ApplicationModule } from "./application"
import { ServicesModule } from "./services"
import { CacheModule } from "@nestjs/cache-manager"
import * as redisStore from "cache-manager-redis-store"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [envConfig],
            isGlobal: true,
        }),
        CacheModule.register({
            store: redisStore,
            ttl: 1000 * 15, 
            isGlobal: true,
            host: envConfig().redis.host,
            port: envConfig().redis.port,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.gql"],
            playground: false,
            plugins: [
                ApolloServerPluginLandingPageLocalDefault(),
            ],
            introspection: true,
        }),

        ServicesModule,
        ApplicationModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}

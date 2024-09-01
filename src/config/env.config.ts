export enum NodeEnv {
    Production = "production",
    Development = "development",
}

export const envConfig = () => ({
    port: process.env.PORT ?? 3672,
    nodeEnv: (process.env.NODE_ENV ?? NodeEnv.Development) as NodeEnv,
    ssl: {
        cert: process.env.SSL_CERT,
        key: process.env.SSL_KEY,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT ?? 6379),
    }
})
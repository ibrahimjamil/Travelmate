"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    DB_TYPE: 'postgres',
    DB_HOST: process.env.POSTGRES_HOST,
    DB_NAME: process.env.POSTGRES_DB,
    DB_PORT: process.env.POSTGRES_PORT,
    DB_USERNAME: process.env.POSTGRES_USER,
    DB_PASSWORD: process.env.POSTGRES_PASSWORD,
    DB_SCHEMA: 'public',
    DB_SSL: process.env.DB_SSL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SANDS_API_TOKEN: process.env.SANDS_API_TOKEN,
    AWS_REGION: process.env.AWS_REGION,
    AWS_COGNITO_SECRET_HASH: process.env.AWS_COGNITO_SECRET_HASH,
    AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
    AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    MEILI_HOST: process.env.MEILI_HOST,
    MEILI_PORT: process.env.MEILI_PORT,
    SENTRY_DNS: process.env.SENTRY_DNS,
    MAX_REQUEST_PER_IP: process.env.MAX_REQUEST_PER_IP,
    REQUEST_WINDOW_SEC: process.env.REQUEST_WINDOW_SEC,
};
//# sourceMappingURL=appConfig.js.map
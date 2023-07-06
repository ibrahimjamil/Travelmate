"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
require('custom-env').env(true);
require('dotenv').config();
var objection_1 = require("objection");
var knex_1 = __importDefault(require("knex"));
var path_1 = __importDefault(require("path"));
var appConfig_1 = __importDefault(require("./src/config/appConfig"));
// Update with your config settings.
var knexConnection = {
    local: (0, knex_1.default)(__assign({ client: 'postgresql', connection: {
            host: appConfig_1.default.DB_HOST,
            port: Number(appConfig_1.default.DB_PORT),
            user: appConfig_1.default.DB_USERNAME,
            password: appConfig_1.default.DB_PASSWORD,
            database: appConfig_1.default.DB_NAME,
        }, migrations: {
            directory: path_1.default.join(__dirname, '/src/migrations'),
        } }, (0, objection_1.knexSnakeCaseMappers)({
        underscoreBetweenUppercaseLetters: true,
    }))),
    dev: (0, knex_1.default)(__assign({ client: 'postgresql', connection: {
            host: appConfig_1.default.DB_HOST,
            port: Number(appConfig_1.default.DB_PORT),
            user: appConfig_1.default.DB_USERNAME,
            password: appConfig_1.default.DB_PASSWORD,
            database: appConfig_1.default.DB_NAME,
        }, migrations: {
            directory: path_1.default.join(__dirname, '/src/migrations'),
        } }, (0, objection_1.knexSnakeCaseMappers)({
        underscoreBetweenUppercaseLetters: true,
    }))),
    test: (0, knex_1.default)(__assign({ client: 'postgresql', connection: {
            host: appConfig_1.default.DB_HOST,
            port: Number(appConfig_1.default.DB_PORT),
            user: appConfig_1.default.DB_USERNAME,
            password: appConfig_1.default.DB_PASSWORD,
            database: appConfig_1.default.DB_NAME,
        }, migrations: {
            directory: path_1.default.join(__dirname, '/src/migrations'),
        } }, (0, objection_1.knexSnakeCaseMappers)({
        underscoreBetweenUppercaseLetters: true,
    }))),
    staging: (0, knex_1.default)(__assign({ client: 'postgresql', connection: {
            host: appConfig_1.default.DB_HOST,
            port: Number(appConfig_1.default.DB_PORT),
            user: appConfig_1.default.DB_USERNAME,
            password: appConfig_1.default.DB_PASSWORD,
            database: appConfig_1.default.DB_NAME,
            ssl: { rejectUnauthorized: false },
        }, migrations: {
            directory: path_1.default.join(__dirname, '/src/migrations'),
        }, seeds: {
            directory: path_1.default.join(__dirname, '/src/seeds'),
        } }, (0, objection_1.knexSnakeCaseMappers)({
        underscoreBetweenUppercaseLetters: true,
    }))),
    production: (0, knex_1.default)(__assign({ client: 'postgresql', connection: {
            host: appConfig_1.default.DB_HOST,
            port: Number(appConfig_1.default.DB_PORT),
            user: appConfig_1.default.DB_USERNAME,
            password: appConfig_1.default.DB_PASSWORD,
            database: appConfig_1.default.DB_NAME,
        }, migrations: {
            directory: path_1.default.join(__dirname, '/src/migrations'),
        }, seeds: {
            directory: path_1.default.join(__dirname, '/src/seeds'),
        } }, (0, objection_1.knexSnakeCaseMappers)({
        underscoreBetweenUppercaseLetters: true,
    }))),
};
exports.default = knexConnection;
//# sourceMappingURL=knexConnection.js.map
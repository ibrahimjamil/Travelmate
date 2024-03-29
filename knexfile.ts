/* eslint-disable */
require('custom-env').env(true);
require('dotenv').config();
import { knexSnakeCaseMappers } from 'objection';
import type { Knex } from 'knex';
import APP_CONFIG from './src/config/appConfig';

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  local: {
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  dev: {
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  test: {
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    seeds: {
      directory: __dirname + '/src/seeds',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
  production: {
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/src/migrations',
    },
    seeds: {
      directory: __dirname + '/src/seeds',
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  },
};

export default config;

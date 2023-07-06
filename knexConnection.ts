/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/first */
require('custom-env').env(true);
require('dotenv').config();

import { knexSnakeCaseMappers } from 'objection';
import type { Knex } from 'knex';
import knex from 'knex';
import path from 'path';
import APP_CONFIG from './src/config/appConfig';

// Update with your config settings.
const knexConnection: { [key: string]: Knex<any, unknown[]> } = {
  local: knex({
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, '/src/migrations'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  dev: knex({
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, '/src/migrations'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  test: knex({
    client: 'postgresql',
    connection: {
      host: APP_CONFIG.DB_HOST,
      port: Number(APP_CONFIG.DB_PORT),
      user: APP_CONFIG.DB_USERNAME,
      password: APP_CONFIG.DB_PASSWORD,
      database: APP_CONFIG.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, '/src/migrations'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  staging: knex({
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
      directory: path.join(__dirname, '/src/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/src/seeds'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
  production: knex({
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
      directory: path.join(__dirname, '/src/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/src/seeds'),
    },
    ...knexSnakeCaseMappers({
      underscoreBetweenUppercaseLetters: true,
    }),
  }),
};

export default knexConnection;

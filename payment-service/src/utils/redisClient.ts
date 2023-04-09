import { createClient, RedisClientOptions } from 'redis';
import appConfig from '../config/appConfig';
import { logger } from './logger';

export class RedisClient {
  redisClient;

  constructor() {
    if (appConfig.REDIS_HOST && appConfig.REDIS_PORT && appConfig.REDIS_PASSWORD) {
      const redisClientOption: RedisClientOptions = {
        socket: {
          host: appConfig.REDIS_HOST,
          port: +appConfig.REDIS_PORT,
        },
        password: appConfig.REDIS_PASSWORD,
      };
      this.redisClient = createClient(redisClientOption);
    } else {
      this.redisClient = createClient();
    }

    this.redisClient.on('error', (error) => {
      logger.error(error.message);
    });

    this.redisClient.connect();
  }

  public async set(key: string, value: string, options?: any) {
    return this.redisClient.set(key, value, options);
  }

  public async get(key: string) {
    return this.redisClient.get(key);
  }

  public async del(key: string) {
    return this.redisClient.del(key);
  }
}

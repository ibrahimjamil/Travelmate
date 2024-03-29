import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
import appConfig from '../config/appConfig';
import { RedisClient } from '../utils/redisClient';

export const rateLimiterAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const Ip = req.ip;
  const pointsToConsume = 1;
  const redisClient = new RedisClient();
  const maxRequests = Number(appConfig.MAX_REQUEST_PER_IP);
  const windowSec = Number(appConfig.REQUEST_WINDOW_SEC);

  const rateLimiterMemory = new RateLimiterMemory({
    points: maxRequests,
    duration: windowSec, // here number is represented in seconds.
    blockDuration: 60,
  });

  const rateLimiterRedis = new RateLimiterRedis({
    storeClient: redisClient,
    points: maxRequests, // Number of points.
    duration: windowSec, // Per 1 seconds.
    inMemoryBlockOnConsumed: maxRequests + 1, // If userId or IP consume >=301 points per minute.
    inMemoryBlockDuration: 60, // Block it for a minute in memory, so no requests go to Redis.
    insuranceLimiter: rateLimiterMemory, // reserved if redis stops unexpectedly.
  });
  try {
    await rateLimiterRedis.consume(Ip, pointsToConsume);
    next();
  } catch (error) {
    res.status(429).send({
      error: true,
      message: 'Too many requests try later.',
    });
  }
};

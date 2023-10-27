import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

const redisClient: RedisClientType = createClient();

(async () => {
  redisClient.on('connect', () => console.log('Redis Connected'));

  redisClient.on('ready', () => console.log('Redis Ready'));

  redisClient.on('reconnecting', () => console.log('Redis Reconnecting'));

  redisClient.on('error', error => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

export { redisClient as redisClientV1 };

//   redisClient.on('end', () => console.log('Redis End'));

//   redisClient.on('warning', warning => console.warn(`Warning : ${warning}`));

//   redisClient.on('close', () => console.log('Redis Close'));

//   redisClient.on('select', () => console.log('Redis Select'));

//   redisClient.on('unref', () => console.log('Redis Unref'));

//   redisClient.on('monitor', () => console.log('Redis Monitor'));

'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.redisClientV1 = void 0;
const redis_1 = require('redis');
const redisClient = (0, redis_1.createClient)();
exports.redisClientV1 = redisClient;
(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    redisClient.on('connect', () => console.log('Redis Connected'));
    redisClient.on('ready', () => console.log('Redis Ready'));
    redisClient.on('reconnecting', () => console.log('Redis Reconnecting'));
    redisClient.on('error', error => console.error(`Error : ${error}`));
    yield redisClient.connect();
  }))();
//   redisClient.on('end', () => console.log('Redis End'));
//   redisClient.on('warning', warning => console.warn(`Warning : ${warning}`));
//   redisClient.on('close', () => console.log('Redis Close'));
//   redisClient.on('select', () => console.log('Redis Select'));
//   redisClient.on('unref', () => console.log('Redis Unref'));
//   redisClient.on('monitor', () => console.log('Redis Monitor'));

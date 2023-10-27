/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { redisClientV1 } from '../config/redisConfig';
import AppError from '../errors/AppError';

export const throwResAndCache = async (
  req: Request,
  res: Response,
  data: any,
  statusCode: number,
  message: string,
  success: boolean,
  meta?: {
    page: number;
    limit: number;
    total?: number;
  },
) => {
  let objectWithMeta = {};
  if (meta) {
    objectWithMeta = {
      success,
      statusCode: statusCode,
      message,
      meta: {
        page: meta?.page,
        limit: meta?.limit,
        total: meta?.total,
      },
      data: data,
    };
  } else {
    objectWithMeta = {
      success,
      statusCode: statusCode,
      message,
      data: data,
    };
  }

  const url = req.originalUrl;
  const method = req.method;
  const key = `${method}:${url}`;

  try {
    await redisClientV1.set(key, JSON.stringify(objectWithMeta));
    await redisClientV1.expire(key, 24 * 3600);
  } catch (error) {
    new AppError('Redis Error', 500);
  }

  return res.status(statusCode).json(objectWithMeta);
};

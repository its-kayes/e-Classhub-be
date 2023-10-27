/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const throwResponse = async (
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

  return res.status(statusCode).json(objectWithMeta);
};

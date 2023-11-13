import { Request } from 'express';
import httpStatus from 'http-status';
import uap from 'ua-parser-js';
import AppError from '../../errors/AppError';
import { Tracker } from './tracker.model';

//  Save Log
export const logTracker = async (
  email: string,
  req: Request,
): Promise<void> => {
  const ua = uap(req.headers['user-agent']);

  const { browser, cpu, device, engine, os } = ua;

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const network = {
    ip,
  };

  try {
    const saved = await Tracker.create({
      browser,
      cpu,
      device,
      engine,
      os,
      email,
      network,
    });

    if (!saved || !saved._id)
      throw new AppError('Error saving log!', httpStatus.INTERNAL_SERVER_ERROR);
  } catch (error) {
    throw new AppError(
      'Something went wrong on logger!',
      httpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

// Get User Based Log History
const GetUserBasedLogHistory = async (email: string) => {
  const result = await Tracker.aggregate([
    {
      $match: {
        email,
      },
    },
    {
      $group: {
        _id: '$_id',
        browser: {
          $first: '$browser',
        },
        os: {
          $first: '$os',
        },
        cpu: {
          $first: '$cpu',
        },
        date: {
          $first: '$createdAt',
        },
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ]);

  return result;
};

export const TrackerService = {
  GetUserBasedLogHistory,
};

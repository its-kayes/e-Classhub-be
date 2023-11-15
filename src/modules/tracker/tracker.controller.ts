import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';
import { TrackerService } from './tracker.service';

const GetUserBasedLogHistory: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.params as { email: string };
  if (!email) throw new AppError('Email is required', httpStatus.BAD_REQUEST);

  const result = await TrackerService.GetUserBasedLogHistory(email);
  if (!result) throw new AppError('No logs found', httpStatus.NOT_FOUND);

  return throwResponse(
    req,
    res,
    result,
    httpStatus.OK,
    'Log history fetch successfully',
    true,
  );
});

export const TrackerController = {
  GetUserBasedLogHistory,
};

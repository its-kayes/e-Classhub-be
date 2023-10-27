import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';

const Get: RequestHandler = catchAsync(async (req, res) => {
  throwResponse(req, res, {}, httpStatus.OK, 'OK', true);
});

export const HealthCheckController = {
  Get,
};

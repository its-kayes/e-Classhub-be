import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';

// Find User Info
const FindUser: RequestHandler = catchAsync(async (req, res) => {
  throwResponse(req, res, {}, httpStatus.OK, 'User Found', true);
});

export const UserController = {
  FindUser,
};

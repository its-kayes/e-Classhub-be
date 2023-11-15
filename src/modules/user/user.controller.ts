import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';
import { isRequestOk } from '../../util/isRequestOk';
import { logTracker } from '../tracker/tracker.service';
import { IUser } from './user.interface';
import { UserService } from './user.service';

// Find User Info
const FindUser: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.query as { email: string };

  isRequestOk([email]);

  const result = await UserService.FindUser(email);
  if (!result)
    throw new AppError(
      'Something went wrong',
      httpStatus.INTERNAL_SERVER_ERROR,
    );

  throwResponse(req, res, result, httpStatus.OK, 'User Found', true);
});

// Save User
const UserSignUp: RequestHandler = catchAsync(async (req, res) => {
  const { name, email, password, type, gender } = req.body as IUser;

  isRequestOk([name, email, password, type, gender]);

  const result = await UserService.UserSignUp({
    name,
    email,
    gender,
    password,
    type,
    isVerified: false,
  });

  if (!result)
    throw new AppError(
      'Something went wrong',
      httpStatus.INTERNAL_SERVER_ERROR,
    );

  return throwResponse(
    req,
    res,
    result,
    httpStatus.OK,
    'Sign in Successful',
    true,
  );
});

// Sign In User
const UserSignIn: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body as IUser;

  isRequestOk([email, password]);

  const result = await UserService.UserSignIn({ email, password });

  if (!result)
    throw new AppError(
      'Something went wrong',
      httpStatus.INTERNAL_SERVER_ERROR,
    );

  await logTracker(email, req);

  return throwResponse(
    req,
    res,
    result,
    httpStatus.OK,
    'Sign in Successful',
    true,
  );
});

//Update Name Title
const UpdateNameTitle: RequestHandler = catchAsync(async (req, res) => {
  const { name, title } = req.body as { name: string; title: string };
  const { email } = req.params as { email: string };

  isRequestOk([name, title, email]);

  const result = await UserService.UpdateNameTitle(name, title, email);

  if (!result)
    throw new AppError(
      'Something went wrong',
      httpStatus.INTERNAL_SERVER_ERROR,
    );

  return throwResponse(
    req,
    res,
    result,
    httpStatus.OK,
    'Name and Title Updated',
    true,
  );
});

export const UserController = {
  FindUser,
  UserSignUp,
  UserSignIn,
  UpdateNameTitle,
};

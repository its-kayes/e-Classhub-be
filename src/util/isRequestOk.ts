/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

export const isRequestOk = (requiredFields: any) => {
  if (requiredFields.some((field: any) => !field)) {
    throw new AppError(
      'Please fill all the required fields',
      httpStatus.BAD_REQUEST,
    );
  }

  return;
};

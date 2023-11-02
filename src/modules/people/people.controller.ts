import { RequestHandler } from 'express';
import catchAsync from '../../util/catchAsync';
import { IPeople } from './people.interface';
import { isRequestOk } from '../../util/isRequestOk';
import { isClassCodeOk } from '../../util/isClassCodeOk';
import { PeopleService } from './people.service';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { throwResponse } from '../../shared/throwResponse';

// Join Classroom
const JoinClassroom: RequestHandler = catchAsync(async (req, res) => {
  const { classCode, requestEmail } = req.body as IPeople;

  isRequestOk([classCode, requestEmail]);

  await isClassCodeOk(classCode);

  const result = await PeopleService.JoinClassroom({ classCode, requestEmail });
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
    'Classroom Join request sent successfully!',
    true,
  );
});

// Get Requested People list for a Classroom
const GetRequestedPeople: RequestHandler = catchAsync(async (req, res) => {
  const { email, classCode } = req.params;

  isRequestOk([classCode, email]);

  await isClassCodeOk(classCode);

  const result = await PeopleService.GetRequestedPeople(email, classCode);
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
    'Requested People fetched successfully!',
    true,
  );
});

export const PeopleController = {
  JoinClassroom,
  GetRequestedPeople,
};

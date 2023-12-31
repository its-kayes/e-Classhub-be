import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';
import { isClassCodeOk } from '../../util/isClassCodeOk';
import { isRequestOk } from '../../util/isRequestOk';
import { IPeople } from './people.interface';
import { PeopleService } from './people.service';

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
  const { status, email, classCode } = req.params as {
    status: 'pending' | 'block' | 'joined';
    email: string;
    classCode: string;
  };

  isRequestOk([classCode, email, status]);

  await isClassCodeOk(classCode);

  const result = await PeopleService.GetRequestedPeople(
    status,
    email,
    classCode,
  );
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

const ChangeStatus: RequestHandler = catchAsync(async (req, res) => {
  const { id, status } = req.body as { id: string; status: string };
  if (!id || !status)
    throw new AppError('Id and Status must needed', httpStatus.BAD_REQUEST);

  const result = await PeopleService.ChangeStatus(id, status);
  if (!result)
    throw new AppError(
      'Something went wrong',
      httpStatus.INTERNAL_SERVER_ERROR,
    );

  throwResponse(req, res, result, httpStatus.OK, 'Status Updated', true);
});

export const PeopleController = {
  JoinClassroom,
  GetRequestedPeople,
  ChangeStatus,
};

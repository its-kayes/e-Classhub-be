import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';
import { isClassCodeOk } from '../../util/isClassCodeOk';
import { isRequiredOk } from '../../util/isRequiredOk';
import { ICreateClassroom } from './classroom.interface';
import { ClassroomService } from './classroom.service';

// Create Classroom !
const CreateClassroom: RequestHandler = catchAsync(async (req, res) => {
  const { className, shortTitle, mentorEmail, mentorName } =
    req.body as ICreateClassroom;

  isRequiredOk({ className, shortTitle, mentorEmail, mentorName });

  const result = await ClassroomService.CreateClassroom({
    className,
    shortTitle,
    mentorEmail,
    mentorName,
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
    httpStatus.CREATED,
    'Successfully created classroom!',
    true,
  );
});

// Find Classroom with Class code !
const FindClassroom: RequestHandler = catchAsync(async (req, res) => {
  const { classCode } = req.params as { classCode: string };
  if (!classCode)
    throw new AppError('Class code is required', httpStatus.BAD_REQUEST);

  await isClassCodeOk(classCode);

  const result = await ClassroomService.FindClassroom(classCode);
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
    'Successfully fetched classroom!',
    true,
  );
});

export const ClassroomController = {
  CreateClassroom,
  FindClassroom,
};

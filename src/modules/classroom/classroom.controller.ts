import { RequestHandler } from 'express';
import catchAsync from '../../util/catchAsync';
import { ICreateClassroom } from './classroom.interface';
import { isRequiredOk } from '../../util/isRequiredOk';
import { ClassroomService } from './classroom.service';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { throwResponse } from '../../shared/throwResponse';

// Create Classroom !
const CreateClassroom: RequestHandler = catchAsync(async (req, res) => {
  const { className, shortTile, mentorEmail, mentorName } =
    req.body as ICreateClassroom;

  isRequiredOk({ className, shortTile, mentorEmail, mentorName });

  const result = await ClassroomService.CreateClassroom({
    className,
    shortTile,
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

export const ClassroomController = {
  CreateClassroom,
};

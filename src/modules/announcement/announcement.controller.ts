import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';
import { isClassCodeOk } from '../../util/isClassCodeOk';
import { formatFileName } from './announcement.helper';
import { IAnnouncement } from './announcement.interface';
import { AnnouncementService } from './announcement.service';

//TODO: File size reduce (sharp)
//TODO: Track who announced
//TODO: Video Size Reduce
//TODO: Audio Size Reduce
// Create Announcement
const CreateAnnouncement: RequestHandler = catchAsync(async (req, res) => {
  const { classCode, description, email } = req.body as IAnnouncement;

  if (!classCode || !email)
    throw new AppError(
      'Class Code & Email is required',
      httpStatus.BAD_REQUEST,
    );

  await isClassCodeOk(classCode);

  let chunkFiles: { name: string; buffer: Buffer; mimetype: string }[] = [];

  if (
    req.files &&
    'materials' in req.files &&
    req.files['materials'].length > 0
  ) {
    chunkFiles = req.files['materials'].map(file => ({
      // name: `${classCode}_${file.originalname}`.toLowerCase(),
      name: formatFileName(classCode, file.originalname),
      buffer: file.buffer,
      mimetype: file.mimetype,
    }));
  }

  const response = await AnnouncementService.CreateAnnouncement({
    classCode,
    description,
    materials: chunkFiles,
    email,
  });

  return throwResponse(
    req,
    res,
    response,
    httpStatus.CREATED,
    'Successfully make announcement',
    true,
  );
});

// Get Classroom wise Announcements
const GetAnnouncements: RequestHandler = catchAsync(async (req, res) => {
  const { classCode, email } = req.params;

  if (!classCode || !email)
    throw new AppError(
      'Class Code & Email is required',
      httpStatus.BAD_REQUEST,
    );

  await isClassCodeOk(classCode);

  const response = await AnnouncementService.GetAnnouncements({
    classCode,
    email,
  });

  return throwResponse(
    req,
    res,
    response,
    httpStatus.OK,
    'Successfully get announcements',
    true,
  );
});

// Delete Announcement
const DeleteAnnouncement: RequestHandler = catchAsync(async (req, res) => {
  const { id, email, classCode } = req.body as {
    id: string;
    email: string;
    classCode: string;
  };

  if (!id || !email || !classCode)
    throw new AppError(
      'Id, ClassCode & Email is required',
      httpStatus.BAD_REQUEST,
    );

  await isClassCodeOk(classCode);

  const result = await AnnouncementService.DeleteAnnouncement(
    id,
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
    'Successfully deleted',
    true,
  );
});

export const AnnouncementController = {
  CreateAnnouncement,
  GetAnnouncements,
  DeleteAnnouncement,
};

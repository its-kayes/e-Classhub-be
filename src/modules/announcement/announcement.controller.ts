import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';
import { isClassCodeOk } from '../../util/isClassCodeOk';
import { IAnnouncement } from './announcement.interface';
import { AnnouncementService } from './announcement.service';

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
      name: `${classCode}_${file.originalname}`.toLowerCase(),
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

export const AnnouncementController = {
  CreateAnnouncement,
};

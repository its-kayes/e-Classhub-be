import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import { isClassCodeOk } from '../../util/isClassCodeOk';
import { IAnnouncement } from './announcement.interface';
import { AnnouncementService } from './announcement.service';

// Create Announcement
const CreateAnnouncement: RequestHandler = async (req, res) => {
  const { classCode, description, materials } = req.body as IAnnouncement;

  if (!classCode)
    throw new AppError('Class Code is required', httpStatus.BAD_REQUEST);

  await isClassCodeOk(classCode);

  if (!description || !materials)
    throw new AppError(
      'Announcement Materials or Topic must be needed to create announcement',
      httpStatus.BAD_REQUEST,
    );

  const result = await AnnouncementService.CreateAnnouncement({
    classCode,
    description,
    materials,
  });

  if (!result)
    throw new AppError('Announcement not created', httpStatus.BAD_REQUEST);

  return throwResponse(
    req,
    res,
    result,
    httpStatus.CREATED,
    'Successfully make announcement',
    true,
  );
};

export const AnnouncementController = {
  CreateAnnouncement,
};

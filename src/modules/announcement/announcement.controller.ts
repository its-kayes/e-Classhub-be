import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { throwResponse } from '../../shared/throwResponse';
import catchAsync from '../../util/catchAsync';
import { isClassCodeOk } from '../../util/isClassCodeOk';
import { IAnnouncement } from './announcement.interface';

// Create Announcement
const CreateAnnouncement: RequestHandler = catchAsync(async (req, res) => {
  const { classCode, description, materials } = req.body as IAnnouncement;

  if (!classCode)
    throw new AppError('Class Code is required', httpStatus.BAD_REQUEST);

  if (!description && !materials)
    throw new AppError(
      'Announcement Materials or Topic must be needed to create announcement',
      httpStatus.BAD_REQUEST,
    );

  await isClassCodeOk(classCode);

  let result;
  // if (!materials) {
  //   result = await AnnouncementService.CreateAnnouncement({
  //     classCode,
  //     description,
  //   });
  // } else {

  if (!req.files || !('materials' in req.files)) {
    throw new AppError('Please upload necessary files', httpStatus.BAD_REQUEST);
  }

  const allMaterials = (req.files as unknown as { [fieldname: string]: File[] })
    .materials;

  console.log('materials', allMaterials);

  // }

  if (!result || result === undefined)
    throw new AppError('Announcement not created', httpStatus.BAD_REQUEST);

  return throwResponse(
    req,
    res,
    result,
    httpStatus.CREATED,
    'Successfully make announcement',
    true,
  );
});

export const AnnouncementController = {
  CreateAnnouncement,
};

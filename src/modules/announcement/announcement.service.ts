import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Classroom } from '../classroom/classroom.model';
import { IAnnouncement } from './announcement.interface';
import { Announcement } from './announcement.model';

const CreateAnnouncement = async (announcement: IAnnouncement) => {
  const isCodeOk = await Classroom.findOne({
    classCode: announcement.classCode,
  });

  if (!isCodeOk)
    throw new AppError('Class code is not valid', httpStatus.UNAUTHORIZED);

  // TODO: Also Validate isRightUser ?
  // TODO: Date issue fix(BD time zone implement) ?

  const makeAnnouncement = await Announcement.create(announcement);
  if (!makeAnnouncement || !makeAnnouncement._id)
    throw new AppError('Announcement not created', httpStatus.BAD_REQUEST);

  // return makeAnnouncement;
  return {
    description: makeAnnouncement.description,
    date: makeAnnouncement.date,
  };
};

export const AnnouncementService = {
  CreateAnnouncement,
};

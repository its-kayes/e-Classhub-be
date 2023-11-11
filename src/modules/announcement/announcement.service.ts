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

type NewFile = {
  originalname: string;
};

export type CustomFile = NewFile & File;

// TODO: Create Announcement With Materials
const CreateAnnouncementWithMaterials = async (data: {
  classCode: string;
  description?: string;
  materials?: CustomFile[];
}): Promise<IAnnouncement> => {
  const isCodeOk = await Classroom.findOne({
    classCode: data.classCode,
  });

  if (!isCodeOk)
    throw new AppError('Class code is not valid', httpStatus.UNAUTHORIZED);

  const announcement: IAnnouncement = {
    classCode: data.classCode,
    description: data.description || '',
    materials: [],
  };

  if (data.materials) {
    announcement.materials = data.materials.map(file => {
      const name = `${data.classCode}-${file.originalname}`.toLowerCase();
      return {
        name,
        url: `uploads/${name}`,
      };
    });
  }

  // const links = await Promise.all(allLinks || []);

  return announcement;
};

export const AnnouncementService = {
  CreateAnnouncement,
  CreateAnnouncementWithMaterials,
};

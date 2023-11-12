import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Classroom } from '../classroom/classroom.model';
import { bulkUpload } from './announcement.helper';
import { IAnnouncement } from './announcement.interface';
import { Announcement } from './announcement.model';

const CreateAnnouncement = async (announcement: IAnnouncement) => {
  const isCodeOk = await Classroom.findOne({
    classCode: announcement.classCode,
  });

  if (!isCodeOk)
    throw new AppError('Class code is not valid', httpStatus.UNAUTHORIZED);

  // TODO: Also Validate if user have permission to make announcement ?
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

// TODO: Create Announcement With Materials
const CreateAnnouncementWithMaterials = async (data: {
  classCode: string;
  description?: string;
  materials?: {
    name: string;
    buffer: Buffer;
    mimetype: string;
  }[];
}) => {
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
    const audioFileLinks = await Promise.all(
      data.materials.map(async file => {
        const link = await bulkUpload(file.name, file.buffer, file.mimetype); //TODO: File size reduce (sharp)
        return {
          url: link as string,
        };
      }),
    ).then(data => data);

    announcement.materials = audioFileLinks;
  }

  const save = await Announcement.create(announcement);
  if (!save || !save._id)
    throw new AppError('Announcement not created', httpStatus.BAD_REQUEST);

  return {
    description: save.description,
    materials: save.materials,
    date: save.date,
  };
};

export const AnnouncementService = {
  CreateAnnouncement,
  CreateAnnouncementWithMaterials,
};

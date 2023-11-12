import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Classroom } from '../classroom/classroom.model';
import { bulkUpload } from './announcement.helper';
import { IAnnouncement } from './announcement.interface';
import { Announcement } from './announcement.model';

// <------------------------------- Create Announcement ------------------------------->
const CreateAnnouncement = async (data: {
  classCode: string;
  description?: string | null;
  materials?:
    | {
        name: string;
        buffer: Buffer;
        mimetype: string;
      }[]
    | null;
}) => {
  const isCodeOk = await Classroom.findOne({
    classCode: data.classCode,
  });

  if (!isCodeOk)
    throw new AppError('Class code is not valid', httpStatus.UNAUTHORIZED);

  // TODO: Also Validate if user have permission to make announcement ?

  const announcement: IAnnouncement = {
    classCode: data.classCode,
    description: data.description || null,
    materials: null,
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
};

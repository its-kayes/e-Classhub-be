import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Classroom } from '../classroom/classroom.model';
import { People } from '../people/people.model';
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
  email: string;
}) => {
  const isCodeOk = await Classroom.findOne({
    classCode: data.classCode,
  });

  if (!isCodeOk)
    throw new AppError('Class code is not valid', httpStatus.UNAUTHORIZED);

  // <---------------- Is he / she has the permission to make an announcement  -------------->
  const isRightMentor = await Classroom.findOne({
    classCode: data.classCode,
    mentorEmail: data.email,
  });

  const isRightStudent = await People.findOne({
    classCode: data.classCode,
    requestEmail: data.email,
    status: 'joined',
  });

  if (!isRightMentor && !isRightStudent)
    throw new AppError(
      'You are not allowed to make announcement',
      httpStatus.UNAUTHORIZED,
    );

  //
  const announcement: IAnnouncement = {
    classCode: data.classCode,
    description: data.description || null,
    materials: null,
    email: data.email,
  };

  // <------------------ Upload Audio files to AWS S3 ------------------>
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

  // <------------------ Save Announcement ------------------>
  const save = await Announcement.create(announcement);
  if (!save || !save._id)
    throw new AppError('Announcement not created', httpStatus.BAD_REQUEST);

  return {
    description: save.description,
    materials: save.materials,
    date: save.date,
  };
};

// Get Classroom wise Announcements
const GetAnnouncements = async (data: { classCode: string; email: string }) => {
  const isRightStudent = await People.findOne({
    classCode: data.classCode,
    requestEmail: data.email,
    status: 'joined',
  });

  const isRightMentor = await Classroom.findOne({
    classCode: data.classCode,
    mentorEmail: data.email,
  });

  if (!isRightStudent && !isRightMentor)
    throw new AppError(
      'You are not allowed to see announcements',
      httpStatus.UNAUTHORIZED,
    );

  const announcements = await Announcement.aggregate([
    {
      $match: {
        classCode: data.classCode,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'email',
        foreignField: 'email',
        as: 'email',
      },
    },
    {
      $unwind: '$email',
    },
    {
      $project: {
        description: 1,
        materials: 1,
        date: 1,
        name: '$email.name',
        _id: 0,
        id: '$_id',
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ]);

  return announcements;
};

export const AnnouncementService = {
  CreateAnnouncement,
  GetAnnouncements,
};

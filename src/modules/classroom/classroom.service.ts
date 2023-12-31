import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { generateCode } from '../../util/generateCode';
import { People } from '../people/people.model';
import { User } from '../user/user.model';
import {
  IClassroom,
  IClassroomResponse,
  ICreateClassroom,
} from './classroom.interface';
import { Classroom } from './classroom.model';

// Create Classroom !
const CreateClassroom = async (data: ICreateClassroom) => {
  // <----------------------- Check if mentor is exist or not ----------------------->
  const isMentorExit = await User.findOne({
    email: data.mentorEmail,
    type: 'mentor',
    name: data.mentorName,
  }).select('_id');

  if (!isMentorExit || !isMentorExit._id)
    throw new AppError(
      `It's look like you (${data.mentorEmail}) don't have the permission to create a classroom. To create a classroom you need to be a mentor.`,
      httpStatus.BAD_REQUEST,
    );

  // <----------------------- Generate Class Code  ----------------------->
  const presentDate = Date.now().toString().substring(9, 13).toUpperCase();
  const classCode = `${generateCode()}-${presentDate}-${generateCode()}`;

  const finalObj: IClassroom = {
    className: data.className,
    shortTitle: data.shortTitle,
    mentorEmail: data.mentorEmail,
    mentorName: data.mentorName,
    status: 'active',
    classCode,
  };

  // <----------------------- Create Classroom ----------------------->
  const save = await Classroom.create(finalObj);
  if (!save || !save._id)
    throw new AppError(
      `Their might be some problem in creating classroom. Please try again later.`,
      httpStatus.BAD_REQUEST,
    );

  const returnObj: IClassroomResponse = {
    className: save.className,
    shortTitle: save.shortTitle,
    classCode: save.classCode,
    mentorName: save.mentorName,
  };

  return returnObj;
};

// Find Classroom with Class code !
const FindClassroom = async (classCode: string) => {
  const result = await Classroom.findOne({
    classCode,
    status: 'active',
  }).select('-_id className shortTitle classCode mentorName');

  if (!result || result === null)
    throw new AppError(
      `Their is no classroom exit with this class code (${classCode}). Please check the class code and try again.`,
      httpStatus.BAD_REQUEST,
    );

  return result;
};

// List all Classrooms (User Based) !
const ClassroomList = async (email: string, type: 'mentor' | 'student') => {
  switch (type) {
    case 'mentor': {
      // <----------------------- Check if mentor is exist or not ----------------------->
      const isMentor = await User.findOne({ email }).select('_id type');
      if (!isMentor || isMentor === null || isMentor.type !== 'mentor') {
        throw new AppError(
          `It's look like you (${email}) aren't a mentor.`,
          httpStatus.UNAUTHORIZED,
        );
      }

      const result = await Classroom.find({
        mentorEmail: email,
        status: 'active',
      }).select('-_id className shortTitle classCode mentorName');

      if (!result || result === null)
        throw new AppError(
          `Their is no classroom exit with this email (${email}). Please check the email and try again.`,
          httpStatus.BAD_REQUEST,
        );

      return result;
    }
    case 'student': {
      // <----------------------- Check if student is exist or not ----------------------->
      const isStudent = await User.findOne({ email }).select('_id type');
      if (!isStudent || isStudent === null || isStudent.type !== 'student') {
        throw new AppError(
          `It's look like you (${email}) aren't a student.`,
          httpStatus.UNAUTHORIZED,
        );
      }

      const result = await People.aggregate([
        {
          $match: {
            requestEmail: email,
            status: 'joined',
          },
        },
        {
          $lookup: {
            from: 'classrooms',
            localField: 'classCode',
            foreignField: 'classCode',
            as: 'classroom',
          },
        },
        {
          $unwind: '$classroom',
        },
        {
          $project: {
            _id: 0,
            className: '$classroom.className',
            shortTitle: '$classroom.shortTitle',
            classCode: '$classroom.classCode',
            mentorName: '$classroom.mentorName',
          },
        },
      ]);

      return result;
    }
  }
};

export const ClassroomService = {
  CreateClassroom,
  FindClassroom,
  ClassroomList,
};

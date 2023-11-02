import { generateCode } from '../../util/generateCode';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IClassroom, ICreateClassroom } from './classroom.interface';
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
  const firstFourLetter = data.shortTile.substring(0, 4).toUpperCase();
  const classCode = `${generateCode()}-${firstFourLetter}-${generateCode()}`;

  const finalObj: IClassroom = {
    className: data.className,
    shortTile: data.shortTile,
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

  const returnObj = {
    className: save.className,
    shortTile: save.shortTile,
    classCode: save.classCode,
    mentorName: save.mentorName,
  };

  return returnObj;
};

export const ClassroomService = {
  CreateClassroom,
};

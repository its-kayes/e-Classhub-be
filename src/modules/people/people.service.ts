import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IPeople } from './people.interface';
import { People } from './people.model';
import { User } from '../user/user.model';
import { Classroom } from '../classroom/classroom.model';

// Join Classroom
const JoinClassroom = async (data: IPeople) => {
  const { classCode, requestEmail } = data;

  // Check if user already joined
  const isAlreadyIn = await People.findOne({
    classCode,
    requestEmail,
    status: 'joined',
  });
  if (isAlreadyIn)
    throw new AppError(
      'You already joined this classroom',
      httpStatus.CONFLICT,
    );

  // Check if user exit in pending list
  const isPending = await People.findOne({
    classCode,
    requestEmail,
    status: 'pending',
  });
  if (isPending)
    throw new AppError(
      'You already requested to join this classroom, please wait for the approval from the mentor',
      httpStatus.CONFLICT,
    );

  // Check if User Exit
  const isUserExit = await User.findOne({
    email: data.requestEmail,
    type: 'student',
  });
  if (!isUserExit)
    throw new AppError(
      `It's look like you haven't register yet with this email address (${data.requestEmail}), Please register as student to join a classroom!`,
      httpStatus.NOT_FOUND,
    );

  // Check if class code is valid
  const isClassCodeValid = await Classroom.findOne({
    classCode: data.classCode,
  }).select('classCode status');

  if (!isClassCodeValid)
    throw new AppError(
      `No class exit with this Class Code (${data.classCode})`,
      httpStatus.NOT_FOUND,
    );

  switch (isClassCodeValid.status) {
    case 'active': {
      // Create new request
      const newRequest = await People.create({
        classCode,
        requestEmail,
        status: 'pending',
      });
      if (!newRequest)
        throw new AppError(
          'Something went wrong',
          httpStatus.INTERNAL_SERVER_ERROR,
        );
      return newRequest;
    }
    case 'deactivated':
      throw new AppError(
        `You can't join this Classroom, because mentor deactivated the classroom.`,
        httpStatus.NOT_ACCEPTABLE,
      );

    case 'deleted':
      throw new AppError(
        `You can't join this Classroom, because mentor deleted the classroom.`,
        httpStatus.NOT_ACCEPTABLE,
      );

    case 'archived':
      throw new AppError(
        `You can't join this Classroom, because mentor archived the classroom.`,
        httpStatus.NOT_ACCEPTABLE,
      );

    default:
      throw new AppError(
        'Something went wrong',
        httpStatus.INTERNAL_SERVER_ERROR,
      );
  }
};

export const PeopleService = {
  JoinClassroom,
};

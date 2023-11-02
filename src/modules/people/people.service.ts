import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IPeople } from './people.interface';
import { People } from './people.model';
import { User } from '../user/user.model';
import { Classroom } from '../classroom/classroom.model';

// Join Classroom
const JoinClassroom = async (data: IPeople) => {
  const { classCode, requestEmail } = data;

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

  const isRequested = await People.findOne({
    classCode,
    requestEmail,
  }).select('status');

  if (!isRequested || isRequested === null) {
    //  <----------------- Check if class code is valid ----------------->
    const isClassCodeValid = await Classroom.findOne({
      classCode: data.classCode,
    }).select('classCode status');

    if (!isClassCodeValid)
      throw new AppError(
        `No class exit with this Class Code (${data.classCode})`,
        httpStatus.NOT_FOUND,
      );

    // <----------------- Check classroom activity and make join request ----------------->
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
  } else {
    switch (isRequested.status) {
      case 'joined': {
        throw new AppError(
          `You already joined this classroom`,
          httpStatus.BAD_REQUEST,
        );
      }

      case 'pending': {
        throw new AppError(
          'You already requested to join this classroom, please wait for the approval from the mentor',
          httpStatus.CONFLICT,
        );
      }

      case 'block': {
        throw new AppError(
          'You are blocked by the mentor, please contact the mentor to unblock you',
          httpStatus.NOT_ACCEPTABLE,
        );
      }
    }
  }
};

// Get Requested People list for a Classroom
const GetRequestedPeople = async (email: string, classCode: string) => {
  //<---------------------------- Check if request made by authentic mentor ---------------------------->
  const isMentorRequested = await Classroom.findOne({
    mentorEmail: email,
    classCode: classCode,
  }).select('_id');

  if (!isMentorRequested || isMentorRequested === null)
    throw new AppError(
      `You are not a mentor of this classroom`,
      httpStatus.NOT_FOUND,
    );

  // <----------------- Get requested people details ----------------->
  const details = await People.aggregate([
    {
      $match: {
        classCode: classCode,
        status: 'pending',
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'requestEmail',
        foreignField: 'email',
        as: 'userDetails',
      },
    },
    {
      $project: {
        _id: 0,
        requestEmail: 1,
        status: 1,
        userName: {
          $arrayElemAt: ['$userDetails.name', 0],
        },
        gender: {
          $arrayElemAt: ['$userDetails.gender', 0],
        },
        isVerified: {
          $arrayElemAt: ['$userDetails.isVerified', 0],
        },
      },
    },
  ]);

  return details;
};

export const PeopleService = {
  JoinClassroom,
  GetRequestedPeople,
};

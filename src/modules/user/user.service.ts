import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { hashText } from '../../util/hashText';
import { IUser } from './user.interface';
import { User } from './user.model';

// Sign In User
const UserSignIn = async (data: IUser) => {
  const hashPassword = await hashText(data.password);

  data.password = hashPassword;

  // Manual Email Verification
  const isAlreadyExit = await User.findOne({
    email: data.email,
  }).select('email');
  if (isAlreadyExit)
    throw new AppError(
      'You already register with this email address ',
      httpStatus.NOT_ACCEPTABLE,
    );

  const save = await User.create(data);
  if (!save || save === null)
    new AppError(
      "User Info can't save, their might be an issues while saving data",
      httpStatus.NOT_ACCEPTABLE,
    );

  // TODO: Send Email Verification Link

  return save;
};

// Find User Info
const FindUser = async (email: string) => {
  const result = await User.findOne({ email });

  if (!result || result === null)
    throw new AppError('No user found', httpStatus.NOT_FOUND);

  return result;
};

export const UserService = {
  UserSignIn,
  FindUser,
};

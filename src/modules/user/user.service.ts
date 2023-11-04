import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { hashText } from '../../util/hashText';
import { IUser, IUserSignIn } from './user.interface';
import { User } from './user.model';

// Sign Up User
const UserSignUp = async (data: IUser) => {
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

// Sign In User
const UserSignIn = async (data: IUserSignIn) => {
  const { email, password } = data;

  const isUserExit = await User.findOne({ email }).select(
    '+password +email +name +type',
  );
  if (!isUserExit) throw new AppError('User not found', httpStatus.NOT_FOUND);

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isUserExit.password as string,
  );
  if (!isPasswordMatch)
    throw new AppError('Password not match', httpStatus.BAD_REQUEST);

  const finalData = {
    id: isUserExit._id,
    name: isUserExit.name,
    email: isUserExit.email,
    type: isUserExit.type,
  };
  return finalData;
};

//Update Name Title
const UpdateNameTitle = async (name: string, title: string, email: string) => {
  const result = await User.findOneAndUpdate(
    { email },
    { title, name },
    { new: true },
  ).select(['name', 'title']);

  if (!result || result === null)
    throw new AppError('No user found', httpStatus.NOT_FOUND);

  return result;
};

export const UserService = {
  UserSignUp,
  FindUser,
  UserSignIn,
  UpdateNameTitle,
};

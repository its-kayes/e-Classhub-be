import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

export const hashText = async (password: string) => {
  if (!password)
    throw new AppError(
      'Please provide the text that you wants to hashed ',
      httpStatus.BAD_REQUEST,
    );

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

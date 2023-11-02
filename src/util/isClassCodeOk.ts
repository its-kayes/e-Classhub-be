import httpStatus from 'http-status';
import AppError from '../errors/AppError';

export const isClassCodeOk = async (classCode: string) => {
  const classCodeRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

  if (!classCodeRegex.test(classCode))
    throw new AppError(
      'Invalid Class Code Structured',
      httpStatus.NOT_ACCEPTABLE,
    );
};

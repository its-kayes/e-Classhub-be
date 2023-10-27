/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { cloudinary } from '../config/cloudinary';
import AppError from '../errors/AppError';

export const imgUploader = async (base64: any) => {
  if (!base64) throw new AppError('No image found for upload', 400);

  const { url } = await cloudinary.uploader.upload(base64, {
    upload_preset: process.env.CLOUD_UPLOAD_PRESET,
  });

  if (!url)
    throw new AppError('Image upload failed', httpStatus.INTERNAL_SERVER_ERROR);

  return url;
};

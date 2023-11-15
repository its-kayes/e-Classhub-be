import AWS, { S3 } from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from '../../config/siteEnv';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

type SendData = S3.ManagedUpload.SendData;

// Bulk Uploader for upload Many Audio files
export const bulkUpload = (
  filename: string,
  file: Buffer,
  mimetype: string,
) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: AWS_BUCKET_NAME,
      Body: file,
      ContentType: mimetype,
      ACL: 'public-read',
    };

    s3.upload(params, (err: Error, data: SendData) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

export const formatFileName = (
  classCode: string,
  originalName: string,
): string => {
  const type = originalName.split('.')[1];
  // Remove spaces and replace with underscores
  const formattedName = originalName
    .split('.')[0]
    .replace(/[\s!@#$%^&*()_+={}[\]:;<>,.?~\\/-]/g, '_')
    .replace(/_+$/, '');

  // Concatenate classCode and formattedName, convert to lowercase
  const result = `${classCode}_${formattedName}.${type}`.toLowerCase();

  return result;
};

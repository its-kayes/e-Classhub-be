/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from '../config/siteEnv';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// upload audio file
export const s3AudioUploader = (filename: string, file: any) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: AWS_BUCKET_NAME,
      Body: file,
      ContentType: 'audio/mpeg',
      ACL: 'public-read',
    };

    s3.upload(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

// Delete Audio
export const s3DeleteAudio = (filename: string) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: AWS_BUCKET_NAME,
    };

    s3.deleteObject(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

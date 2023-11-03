"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3DeleteAudio = exports.s3AudioUploader = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const siteEnv_1 = require("../config/siteEnv");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: siteEnv_1.AWS_ACCESS_KEY_ID,
    secretAccessKey: siteEnv_1.AWS_SECRET_ACCESS_KEY,
});
// upload audio file
const s3AudioUploader = (filename, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: siteEnv_1.AWS_BUCKET_NAME,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read',
        };
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Location);
            }
        });
    });
};
exports.s3AudioUploader = s3AudioUploader;
// Delete Audio
const s3DeleteAudio = (filename) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: siteEnv_1.AWS_BUCKET_NAME,
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.s3DeleteAudio = s3DeleteAudio;

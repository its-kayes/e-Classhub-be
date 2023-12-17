"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFileName = exports.bulkUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const siteEnv_1 = require("../../config/siteEnv");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: siteEnv_1.AWS_ACCESS_KEY_ID,
    secretAccessKey: siteEnv_1.AWS_SECRET_ACCESS_KEY,
});
// Bulk Uploader for upload Many Audio files
const bulkUpload = (filename, file, mimetype) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: siteEnv_1.AWS_BUCKET_NAME,
            Body: file,
            ContentType: mimetype,
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
exports.bulkUpload = bulkUpload;
const formatFileName = (classCode, originalName) => {
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
exports.formatFileName = formatFileName;

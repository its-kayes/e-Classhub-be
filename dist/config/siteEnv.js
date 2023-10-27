'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SMTP_USER =
  exports.SMTP_PORT =
  exports.SMTP_PASS =
  exports.SMTP_HOST =
  exports.PORT =
  exports.NODE_ENV =
  exports.MONGO_URI =
  exports.JWT_SECRET =
  exports.JWT_EXPIRES_IN =
  exports.FRONTEND_BASE_URL =
  exports.AWS_SECRET_ACCESS_KEY =
  exports.AWS_BUCKET_REGION =
  exports.AWS_BUCKET_NAME =
  exports.AWS_ACCESS_KEY_ID =
  exports.ALLOW_ALL_ORIGIN =
  exports.ACCESSED_ORIGIN_LIST =
    void 0;
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONTEND_BASE_URL,
  NODE_ENV,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_REGION,
  ALLOW_ALL_ORIGIN,
  ACCESSED_ORIGIN_LIST,
} = process.env;
exports.PORT = PORT;
exports.MONGO_URI = MONGO_URI;
exports.JWT_SECRET = JWT_SECRET;
exports.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
exports.FRONTEND_BASE_URL = FRONTEND_BASE_URL;
exports.NODE_ENV = NODE_ENV;
exports.SMTP_HOST = SMTP_HOST;
exports.SMTP_PORT = SMTP_PORT;
exports.SMTP_USER = SMTP_USER;
exports.SMTP_PASS = SMTP_PASS;
exports.AWS_BUCKET_NAME = AWS_BUCKET_NAME;
exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
exports.AWS_BUCKET_REGION = AWS_BUCKET_REGION;
exports.ALLOW_ALL_ORIGIN = ALLOW_ALL_ORIGIN;
exports.ACCESSED_ORIGIN_LIST = ACCESSED_ORIGIN_LIST;
'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.imgUploader = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const cloudinary_1 = require('../config/cloudinary');
const AppError_1 = __importDefault(require('../errors/AppError'));
const imgUploader = base64 =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!base64) throw new AppError_1.default('No image found for upload', 400);
    const { url } = yield cloudinary_1.cloudinary.uploader.upload(base64, {
      upload_preset: process.env.CLOUD_UPLOAD_PRESET,
    });
    if (!url)
      throw new AppError_1.default(
        'Image upload failed',
        http_status_1.default.INTERNAL_SERVER_ERROR,
      );
    return url;
  });
exports.imgUploader = imgUploader;

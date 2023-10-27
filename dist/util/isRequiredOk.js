'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.isRequiredOk = void 0;
const http_status_1 = __importDefault(require('http-status'));
const AppError_1 = __importDefault(require('../errors/AppError'));
// export const isRequiredOk = (properties: unknown[]) => {
//   properties.forEach(property => {
//     if (!property) {
//       console.log(property);
//       throw new AppError(
//         `Please fill ${property} the fields`,
//         httpStatus.BAD_REQUEST,
//       );
//     }
//   });
//   return true;
// };
const isRequiredOk = properties => {
  for (const property in properties) {
    // if (!properties[property]) {
    if (!property) {
      throw new AppError_1.default(
        `Please fill ${property} the fields`,
        http_status_1.default.BAD_REQUEST,
      );
    }
  }
};
exports.isRequiredOk = isRequiredOk;

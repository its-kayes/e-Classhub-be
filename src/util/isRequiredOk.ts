import httpStatus from 'http-status';
import AppError from '../errors/AppError';

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

export const isRequiredOk = (properties: object) => {
  for (const property in properties) {
    // if (!properties[property]) {
    if (!property) {
      throw new AppError(
        `Please fill ${property} the fields`,
        httpStatus.BAD_REQUEST,
      );
    }
  }
};

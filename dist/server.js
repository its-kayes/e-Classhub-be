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
const mongoose_1 = __importDefault(require('mongoose'));
const app_1 = __importDefault(require('./app'));
const siteEnv_1 = require('./config/siteEnv');
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});
let server;
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      mongoose_1.default
        .connect(siteEnv_1.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log('DB Connected!');
          app_1.default.listen(siteEnv_1.PORT, () =>
            console.log(`Server Ok ? ${siteEnv_1.PORT}`),
          );
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log('Failed to connect database', error);
    }
    process.on('unhandledRejection', error => {
      if (server) {
        server.close(() => {
          console.log(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  });
}
main();

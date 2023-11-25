"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const hashText_1 = require("../../util/hashText");
const user_model_1 = require("./user.model");
// Sign Up User
const UserSignUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield (0, hashText_1.hashText)(data.password);
    data.password = hashPassword;
    // Manual Email Verification
    const isAlreadyExit = yield user_model_1.User.findOne({
        email: data.email,
    }).select('email');
    if (isAlreadyExit)
        throw new AppError_1.default('You already register with this email address ', http_status_1.default.NOT_ACCEPTABLE);
    const save = yield user_model_1.User.create(data);
    if (!save || save === null)
        new AppError_1.default("User Info can't save, their might be an issues while saving data", http_status_1.default.NOT_ACCEPTABLE);
    // TODO: Send Email Verification Link
    return save;
});
// Find User Info
const FindUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email });
    if (!result || result === null)
        throw new AppError_1.default('No user found', http_status_1.default.NOT_FOUND);
    return result;
});
// Sign In User
const UserSignIn = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const isUserExit = yield user_model_1.User.findOne({ email }).select('+password +email +name +type');
    if (!isUserExit)
        throw new AppError_1.default('User not found', http_status_1.default.NOT_FOUND);
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, isUserExit.password);
    if (!isPasswordMatch)
        throw new AppError_1.default('Password not match', http_status_1.default.BAD_REQUEST);
    const finalData = {
        id: isUserExit._id,
        name: isUserExit.name,
        email: isUserExit.email,
        type: isUserExit.type,
    };
    return finalData;
});
//Update Name Title
const UpdateNameTitle = (name, title, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ email }, { title, name }, { new: true }).select(['name', 'title']);
    if (!result || result === null)
        throw new AppError_1.default('No user found', http_status_1.default.NOT_FOUND);
    return result;
});
exports.UserService = {
    UserSignUp,
    FindUser,
    UserSignIn,
    UpdateNameTitle,
};

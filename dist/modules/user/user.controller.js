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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const throwResponse_1 = require("../../shared/throwResponse");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const isRequestOk_1 = require("../../util/isRequestOk");
const user_service_1 = require("./user.service");
// Find User Info
const FindUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    (0, isRequestOk_1.isRequestOk)([email]);
    const result = yield user_service_1.UserService.FindUser(email);
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'User Found', true);
}));
// Save User
const UserSignUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, type, gender } = req.body;
    (0, isRequestOk_1.isRequestOk)([name, email, password, type, gender]);
    const result = yield user_service_1.UserService.UserSignUp({
        name,
        email,
        gender,
        password,
        type,
        isVerified: false,
    });
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Sign in Successful', true);
}));
// Sign In User
const UserSignIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    (0, isRequestOk_1.isRequestOk)([email, password]);
    const result = yield user_service_1.UserService.UserSignIn({ email, password });
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Sign in Successful', true);
}));
exports.UserController = {
    FindUser,
    UserSignUp,
    UserSignIn,
};

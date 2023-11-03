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
exports.ClassroomController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const throwResponse_1 = require("../../shared/throwResponse");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const isClassCodeOk_1 = require("../../util/isClassCodeOk");
const isRequiredOk_1 = require("../../util/isRequiredOk");
const classroom_service_1 = require("./classroom.service");
// Create Classroom !
const CreateClassroom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { className, shortTitle, mentorEmail, mentorName } = req.body;
    (0, isRequiredOk_1.isRequiredOk)({ className, shortTitle, mentorEmail, mentorName });
    const result = yield classroom_service_1.ClassroomService.CreateClassroom({
        className,
        shortTitle,
        mentorEmail,
        mentorName,
    });
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.CREATED, 'Successfully created classroom!', true);
}));
// Find Classroom with Class code !
const FindClassroom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classCode } = req.params;
    if (!classCode)
        throw new AppError_1.default('Class code is required', http_status_1.default.BAD_REQUEST);
    yield (0, isClassCodeOk_1.isClassCodeOk)(classCode);
    const result = yield classroom_service_1.ClassroomService.FindClassroom(classCode);
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Successfully fetched classroom!', true);
}));
exports.ClassroomController = {
    CreateClassroom,
    FindClassroom,
};

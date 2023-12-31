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
exports.PeopleController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const throwResponse_1 = require("../../shared/throwResponse");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const isClassCodeOk_1 = require("../../util/isClassCodeOk");
const isRequestOk_1 = require("../../util/isRequestOk");
const people_service_1 = require("./people.service");
// Join Classroom
const JoinClassroom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classCode, requestEmail } = req.body;
    (0, isRequestOk_1.isRequestOk)([classCode, requestEmail]);
    yield (0, isClassCodeOk_1.isClassCodeOk)(classCode);
    const result = yield people_service_1.PeopleService.JoinClassroom({ classCode, requestEmail });
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Classroom Join request sent successfully!', true);
}));
// Get Requested People list for a Classroom
const GetRequestedPeople = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, email, classCode } = req.params;
    (0, isRequestOk_1.isRequestOk)([classCode, email, status]);
    yield (0, isClassCodeOk_1.isClassCodeOk)(classCode);
    const result = yield people_service_1.PeopleService.GetRequestedPeople(status, email, classCode);
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Requested People fetched successfully!', true);
}));
const ChangeStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    if (!id || !status)
        throw new AppError_1.default('Id and Status must needed', http_status_1.default.BAD_REQUEST);
    const result = yield people_service_1.PeopleService.ChangeStatus(id, status);
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Status Updated', true);
}));
exports.PeopleController = {
    JoinClassroom,
    GetRequestedPeople,
    ChangeStatus,
};

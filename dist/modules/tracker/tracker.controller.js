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
exports.TrackerController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const throwResponse_1 = require("../../shared/throwResponse");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const tracker_service_1 = require("./tracker.service");
const GetUserBasedLogHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email)
        throw new AppError_1.default('Email is required', http_status_1.default.BAD_REQUEST);
    const result = yield tracker_service_1.TrackerService.GetUserBasedLogHistory(email);
    if (!result)
        throw new AppError_1.default('No logs found', http_status_1.default.NOT_FOUND);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Log history fetch successfully', true);
}));
exports.TrackerController = {
    GetUserBasedLogHistory,
};

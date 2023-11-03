"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestOk = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const isRequestOk = (requiredFields) => {
    if (requiredFields.some((field) => !field)) {
        throw new AppError_1.default('Please fill all the required fields', http_status_1.default.BAD_REQUEST);
    }
    return;
};
exports.isRequestOk = isRequestOk;

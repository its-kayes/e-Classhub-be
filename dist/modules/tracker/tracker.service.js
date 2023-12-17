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
exports.TrackerService = exports.logTracker = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const tracker_model_1 = require("./tracker.model");
//  Save Log
const logTracker = (email, req) => __awaiter(void 0, void 0, void 0, function* () {
    const ua = (0, ua_parser_js_1.default)(req.headers['user-agent']);
    const { browser, cpu, device, engine, os } = ua;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const network = {
        ip,
    };
    try {
        const saved = yield tracker_model_1.Tracker.create({
            browser,
            cpu,
            device,
            engine,
            os,
            email,
            network,
        });
        if (!saved || !saved._id)
            throw new AppError_1.default('Error saving log!', http_status_1.default.INTERNAL_SERVER_ERROR);
    }
    catch (error) {
        throw new AppError_1.default('Something went wrong on logger!', http_status_1.default.INTERNAL_SERVER_ERROR);
    }
});
exports.logTracker = logTracker;
// Get User Based Log History
const GetUserBasedLogHistory = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracker_model_1.Tracker.aggregate([
        {
            $match: {
                email,
            },
        },
        {
            $group: {
                _id: '$_id',
                browser: {
                    $first: '$browser',
                },
                os: {
                    $first: '$os',
                },
                cpu: {
                    $first: '$cpu',
                },
                date: {
                    $first: '$createdAt',
                },
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
    ]);
    return result;
});
exports.TrackerService = {
    GetUserBasedLogHistory,
};

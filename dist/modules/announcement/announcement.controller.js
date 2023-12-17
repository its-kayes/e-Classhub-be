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
exports.AnnouncementController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const throwResponse_1 = require("../../shared/throwResponse");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const isClassCodeOk_1 = require("../../util/isClassCodeOk");
const announcement_helper_1 = require("./announcement.helper");
const announcement_service_1 = require("./announcement.service");
//TODO: File size reduce (sharp)
//TODO: Track who announced
//TODO: Video Size Reduce
//TODO: Audio Size Reduce
// Create Announcement
const CreateAnnouncement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classCode, description, email } = req.body;
    if (!classCode || !email)
        throw new AppError_1.default('Class Code & Email is required', http_status_1.default.BAD_REQUEST);
    yield (0, isClassCodeOk_1.isClassCodeOk)(classCode);
    let chunkFiles = [];
    if (req.files &&
        'materials' in req.files &&
        req.files['materials'].length > 0) {
        chunkFiles = req.files['materials'].map(file => ({
            // name: `${classCode}_${file.originalname}`.toLowerCase(),
            name: (0, announcement_helper_1.formatFileName)(classCode, file.originalname),
            buffer: file.buffer,
            mimetype: file.mimetype,
        }));
    }
    const response = yield announcement_service_1.AnnouncementService.CreateAnnouncement({
        classCode,
        description,
        materials: chunkFiles,
        email,
    });
    return (0, throwResponse_1.throwResponse)(req, res, response, http_status_1.default.CREATED, 'Successfully make announcement', true);
}));
// Get Classroom wise Announcements
const GetAnnouncements = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classCode, email } = req.params;
    if (!classCode || !email)
        throw new AppError_1.default('Class Code & Email is required', http_status_1.default.BAD_REQUEST);
    yield (0, isClassCodeOk_1.isClassCodeOk)(classCode);
    const response = yield announcement_service_1.AnnouncementService.GetAnnouncements({
        classCode,
        email,
    });
    return (0, throwResponse_1.throwResponse)(req, res, response, http_status_1.default.OK, 'Successfully get announcements', true);
}));
// Delete Announcement
const DeleteAnnouncement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, classCode } = req.body;
    if (!id || !email || !classCode)
        throw new AppError_1.default('Id, ClassCode & Email is required', http_status_1.default.BAD_REQUEST);
    yield (0, isClassCodeOk_1.isClassCodeOk)(classCode);
    const result = yield announcement_service_1.AnnouncementService.DeleteAnnouncement(id, email, classCode);
    if (!result)
        throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
    return (0, throwResponse_1.throwResponse)(req, res, result, http_status_1.default.OK, 'Successfully deleted', true);
}));
exports.AnnouncementController = {
    CreateAnnouncement,
    GetAnnouncements,
    DeleteAnnouncement,
};

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
exports.AnnouncementService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const classroom_model_1 = require("../classroom/classroom.model");
const people_model_1 = require("../people/people.model");
const announcement_helper_1 = require("./announcement.helper");
const announcement_model_1 = require("./announcement.model");
// <------------------------------- Create Announcement ------------------------------->
const CreateAnnouncement = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isCodeOk = yield classroom_model_1.Classroom.findOne({
        classCode: data.classCode,
    });
    if (!isCodeOk)
        throw new AppError_1.default('Class code is not valid', http_status_1.default.UNAUTHORIZED);
    // <---------------- Is he / she has the permission to make an announcement  -------------->
    const isRightMentor = yield classroom_model_1.Classroom.findOne({
        classCode: data.classCode,
        mentorEmail: data.email,
    });
    const isRightStudent = yield people_model_1.People.findOne({
        classCode: data.classCode,
        requestEmail: data.email,
        status: 'joined',
    });
    if (!isRightMentor && !isRightStudent)
        throw new AppError_1.default('You are not allowed to make announcement', http_status_1.default.UNAUTHORIZED);
    //
    const announcement = {
        classCode: data.classCode,
        description: data.description || null,
        materials: null,
        email: data.email,
    };
    // <------------------ Upload Audio files to AWS S3 ------------------>
    if (data.materials) {
        const audioFileLinks = yield Promise.all(data.materials.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const link = yield (0, announcement_helper_1.bulkUpload)(file.name, file.buffer, file.mimetype); //TODO: File size reduce (sharp)
            return {
                url: link,
            };
        }))).then(data => data);
        announcement.materials = audioFileLinks;
    }
    // <------------------ Save Announcement ------------------>
    const save = yield announcement_model_1.Announcement.create(announcement);
    if (!save || !save._id)
        throw new AppError_1.default('Announcement not created', http_status_1.default.BAD_REQUEST);
    return {
        description: save.description,
        materials: save.materials,
        date: save.date,
    };
});
// Get Classroom wise Announcements
const GetAnnouncements = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isRightStudent = yield people_model_1.People.findOne({
        classCode: data.classCode,
        requestEmail: data.email,
        status: 'joined',
    });
    const isRightMentor = yield classroom_model_1.Classroom.findOne({
        classCode: data.classCode,
        mentorEmail: data.email,
    });
    if (!isRightStudent && !isRightMentor)
        throw new AppError_1.default('You are not allowed to see announcements', http_status_1.default.UNAUTHORIZED);
    const announcements = yield announcement_model_1.Announcement.aggregate([
        {
            $match: {
                classCode: data.classCode,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'email',
                foreignField: 'email',
                as: 'email',
            },
        },
        {
            $unwind: '$email',
        },
        {
            $project: {
                description: 1,
                materials: 1,
                date: 1,
                name: '$email.name',
                _id: 0,
                id: '$_id',
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
    ]);
    return announcements;
});
// Delete Announcement
const DeleteAnnouncement = (id, email, classCode) => __awaiter(void 0, void 0, void 0, function* () {
    const isRightMentor = yield classroom_model_1.Classroom.findOne({
        mentorEmail: email,
        classCode,
        status: 'active',
    });
    const isRightUser = yield announcement_model_1.Announcement.findOne({ _id: id, email });
    if (!isRightMentor && !isRightUser)
        throw new AppError_1.default('You are not allowed to delete this announcement', http_status_1.default.UNAUTHORIZED);
    const deleted = yield announcement_model_1.Announcement.findByIdAndDelete({
        _id: id,
    }, { new: true });
    if (!deleted)
        throw new AppError_1.default('Announcement not deleted', http_status_1.default.BAD_REQUEST);
    return deleted;
});
exports.AnnouncementService = {
    CreateAnnouncement,
    GetAnnouncements,
    DeleteAnnouncement,
};

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
exports.PeopleService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const people_model_1 = require("./people.model");
const user_model_1 = require("../user/user.model");
const classroom_model_1 = require("../classroom/classroom.model");
// Join Classroom
const JoinClassroom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { classCode, requestEmail } = data;
    // Check if User Exit
    const isUserExit = yield user_model_1.User.findOne({
        email: data.requestEmail,
        type: 'student',
    });
    if (!isUserExit)
        throw new AppError_1.default(`It's look like you haven't register yet with this email address (${data.requestEmail}), Please register as student to join a classroom!`, http_status_1.default.NOT_FOUND);
    const isRequested = yield people_model_1.People.findOne({
        classCode,
        requestEmail,
    }).select('status');
    if (!isRequested || isRequested === null) {
        //  <----------------- Check if class code is valid ----------------->
        const isClassCodeValid = yield classroom_model_1.Classroom.findOne({
            classCode: data.classCode,
        }).select('classCode status');
        if (!isClassCodeValid)
            throw new AppError_1.default(`No class exit with this Class Code (${data.classCode})`, http_status_1.default.NOT_FOUND);
        // <----------------- Check classroom activity and make join request ----------------->
        switch (isClassCodeValid.status) {
            case 'active': {
                // Create new request
                const newRequest = yield people_model_1.People.create({
                    classCode,
                    requestEmail,
                    status: 'pending',
                });
                if (!newRequest)
                    throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
                return newRequest;
            }
            case 'deactivated':
                throw new AppError_1.default(`You can't join this Classroom, because mentor deactivated the classroom.`, http_status_1.default.NOT_ACCEPTABLE);
            case 'deleted':
                throw new AppError_1.default(`You can't join this Classroom, because mentor deleted the classroom.`, http_status_1.default.NOT_ACCEPTABLE);
            case 'archived':
                throw new AppError_1.default(`You can't join this Classroom, because mentor archived the classroom.`, http_status_1.default.NOT_ACCEPTABLE);
            default:
                throw new AppError_1.default('Something went wrong', http_status_1.default.INTERNAL_SERVER_ERROR);
        }
    }
    else {
        switch (isRequested.status) {
            case 'joined': {
                throw new AppError_1.default(`You already joined this classroom`, http_status_1.default.BAD_REQUEST);
            }
            case 'pending': {
                throw new AppError_1.default('You already requested to join this classroom, please wait for the approval from the mentor', http_status_1.default.CONFLICT);
            }
            case 'block': {
                throw new AppError_1.default('You are blocked by the mentor, please contact the mentor to unblock you', http_status_1.default.NOT_ACCEPTABLE);
            }
        }
    }
});
// Get Requested People list for a Classroom
const GetRequestedPeople = (status, email, classCode) => __awaiter(void 0, void 0, void 0, function* () {
    //<---------------------------- Check if request made by authentic mentor ---------------------------->
    const isMentorRequested = yield classroom_model_1.Classroom.findOne({
        mentorEmail: email,
        classCode: classCode,
    }).select('_id');
    if (!isMentorRequested || isMentorRequested === null)
        throw new AppError_1.default(`You are not a mentor of this classroom`, http_status_1.default.NOT_FOUND);
    // <----------------- Get requested people details ----------------->
    const details = yield people_model_1.People.aggregate([
        {
            $match: {
                classCode: classCode,
                status,
            },
        },
        {
            $sort: {
                createdAt: 1,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'requestEmail',
                foreignField: 'email',
                as: 'userDetails',
            },
        },
        {
            $project: {
                _id: 1,
                requestEmail: 1,
                status: 1,
                userName: {
                    $arrayElemAt: ['$userDetails.name', 0],
                },
                gender: {
                    $arrayElemAt: ['$userDetails.gender', 0],
                },
                isVerified: {
                    $arrayElemAt: ['$userDetails.isVerified', 0],
                },
            },
        },
    ]);
    return details;
});
exports.PeopleService = {
    JoinClassroom,
    GetRequestedPeople,
};

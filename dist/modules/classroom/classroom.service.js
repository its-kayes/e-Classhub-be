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
exports.ClassroomService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const generateCode_1 = require("../../util/generateCode");
const people_model_1 = require("../people/people.model");
const user_model_1 = require("../user/user.model");
const classroom_model_1 = require("./classroom.model");
// Create Classroom !
const CreateClassroom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // <----------------------- Check if mentor is exist or not ----------------------->
    const isMentorExit = yield user_model_1.User.findOne({
        email: data.mentorEmail,
        type: 'mentor',
        name: data.mentorName,
    }).select('_id');
    if (!isMentorExit || !isMentorExit._id)
        throw new AppError_1.default(`It's look like you (${data.mentorEmail}) don't have the permission to create a classroom. To create a classroom you need to be a mentor.`, http_status_1.default.BAD_REQUEST);
    // <----------------------- Generate Class Code  ----------------------->
    const presentDate = Date.now().toString().substring(9, 13).toUpperCase();
    const classCode = `${(0, generateCode_1.generateCode)()}-${presentDate}-${(0, generateCode_1.generateCode)()}`;
    const finalObj = {
        className: data.className,
        shortTitle: data.shortTitle,
        mentorEmail: data.mentorEmail,
        mentorName: data.mentorName,
        status: 'active',
        classCode,
    };
    // <----------------------- Create Classroom ----------------------->
    const save = yield classroom_model_1.Classroom.create(finalObj);
    if (!save || !save._id)
        throw new AppError_1.default(`Their might be some problem in creating classroom. Please try again later.`, http_status_1.default.BAD_REQUEST);
    const returnObj = {
        className: save.className,
        shortTitle: save.shortTitle,
        classCode: save.classCode,
        mentorName: save.mentorName,
    };
    return returnObj;
});
// Find Classroom with Class code !
const FindClassroom = (classCode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classroom_model_1.Classroom.findOne({
        classCode,
        status: 'active',
    }).select('-_id className shortTitle classCode mentorName');
    if (!result || result === null)
        throw new AppError_1.default(`Their is no classroom exit with this class code (${classCode}). Please check the class code and try again.`, http_status_1.default.BAD_REQUEST);
    return result;
});
// List all Classrooms (User Based) !
const ClassroomList = (email, type) => __awaiter(void 0, void 0, void 0, function* () {
    switch (type) {
        case 'mentor': {
            // <----------------------- Check if mentor is exist or not ----------------------->
            const isMentor = yield user_model_1.User.findOne({ email }).select('_id type');
            if (!isMentor || isMentor === null || isMentor.type !== 'mentor') {
                throw new AppError_1.default(`It's look like you (${email}) aren't a mentor.`, http_status_1.default.UNAUTHORIZED);
            }
            const result = yield classroom_model_1.Classroom.find({
                mentorEmail: email,
                status: 'active',
            }).select('-_id className shortTitle classCode mentorName');
            if (!result || result === null)
                throw new AppError_1.default(`Their is no classroom exit with this email (${email}). Please check the email and try again.`, http_status_1.default.BAD_REQUEST);
            return result;
        }
        case 'student': {
            // <----------------------- Check if student is exist or not ----------------------->
            const isStudent = yield user_model_1.User.findOne({ email }).select('_id type');
            if (!isStudent || isStudent === null || isStudent.type !== 'student') {
                throw new AppError_1.default(`It's look like you (${email}) aren't a student.`, http_status_1.default.UNAUTHORIZED);
            }
            const result = yield people_model_1.People.aggregate([
                {
                    $match: {
                        requestEmail: email,
                        status: 'joined',
                    },
                },
                {
                    $lookup: {
                        from: 'classrooms',
                        localField: 'classCode',
                        foreignField: 'classCode',
                        as: 'classroom',
                    },
                },
                {
                    $unwind: '$classroom',
                },
                {
                    $project: {
                        _id: 0,
                        className: '$classroom.className',
                        shortTitle: '$classroom.shortTitle',
                        classCode: '$classroom.classCode',
                        mentorName: '$classroom.mentorName',
                    },
                },
            ]);
            return result;
        }
    }
});
exports.ClassroomService = {
    CreateClassroom,
    FindClassroom,
    ClassroomList,
};

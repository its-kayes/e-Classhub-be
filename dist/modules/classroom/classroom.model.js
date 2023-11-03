"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classroom = void 0;
const mongoose_1 = require("mongoose");
const classroomSchema = new mongoose_1.Schema({
    className: {
        type: String,
        required: [true, 'Classroom name is must required'],
        minlength: [3, 'Classroom name must be at least 3 characters long'],
        maxlength: [20, 'Classroom name must be at most 20 characters long'],
    },
    shortTitle: {
        type: String,
        required: [true, 'Short title is must required'],
        minlength: [3, 'Short title must be at least 3 characters long'],
        maxlength: [20, 'Short title must be at most 20 characters long'],
    },
    classCode: {
        type: String,
        unique: true,
        required: [true, 'Class code is must required'],
        minlength: [14, 'Class code must be at least 14 characters long'],
        maxlength: [14, 'Class code must be at most 14 characters long'],
        createIndexes: { unique: true },
    },
    mentorEmail: {
        type: String,
        required: [true, 'Mentor email is must required'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    mentorName: {
        type: String,
        required: [true, 'Mentor name is must required'],
    },
    status: {
        type: String,
        required: [true, 'Status is must required'],
        enum: ['active', 'deactivated', 'deleted', 'archived'],
        default: 'active',
    },
}, {
    timestamps: true,
});
exports.Classroom = (0, mongoose_1.model)('classroom', classroomSchema);

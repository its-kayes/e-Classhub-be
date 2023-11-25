"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = void 0;
const mongoose_1 = require("mongoose");
const announcementSchema = new mongoose_1.Schema({
    classCode: {
        type: String,
        required: [true, 'Class code is must required'],
        minlength: [14, 'Class code must be at least 14 characters long'],
        maxlength: [14, 'Class code must be at most 14 characters long'],
    },
    date: {
        type: Date,
        required: [true, 'Date is must required'],
        default: Date.now,
    },
    description: String,
    materials: [
        {
            url: String,
        },
    ],
    email: {
        type: String,
        required: [true, 'Email is must required'],
    },
}, { timestamps: true });
exports.Announcement = (0, mongoose_1.model)('announcement', announcementSchema);

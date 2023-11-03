"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = void 0;
const mongoose_1 = require("mongoose");
const peopleSchema = new mongoose_1.Schema({
    classCode: {
        type: String,
        required: [true, 'Class code is must required'],
        minlength: [14, 'Class code must be at least 14 characters long'],
        maxlength: [14, 'Class code must be at most 14 characters long'],
        validate: {
            validator: function (v) {
                return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid class code address!`,
        },
    },
    requestEmail: {
        type: String,
        required: [true, 'Requested email is must required'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    status: {
        type: String,
        required: [true, 'Status is must required'],
        enum: ['pending', 'block', 'joined'],
        default: 'pending',
    },
}, {
    timestamps: true,
});
exports.People = (0, mongoose_1.model)('people', peopleSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [15, 'Name must not be more than 15 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false,
    },
    type: {
        type: String,
        enum: ['student', 'mentor'],
        default: 'student',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    dob: {
        type: Date,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    postalCode: {
        type: Number,
    },
    title: {
        type: String,
        maxlength: [15, 'Title must not be more than 15 characters long'],
    },
    profilePicture: {
        type: String,
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png|gif|svg)$/.test(v);
            },
            message: props => `${props.value} is not a valid image url!`,
        },
    },
    facebookUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return /https:\/\/www.facebook.com\/[a-zA-Z0-9]+/.test(v);
            },
            message: props => `${props.value} is not a valid facebook url!`,
        },
    },
    websiteUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return /https?:\/\/[a-zA-Z0-9]+/.test(v);
            },
            message: props => `${props.value} is not a valid website url!`,
        },
    },
    linkedinUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return /https:\/\/www.linkedin.com\/[a-zA-Z0-9]+/.test(v);
            },
            message: props => `${props.value} is not a valid linkedin url!`,
        },
    },
    githubUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return /https:\/\/www.github.com\/[a-zA-Z0-9]+/.test(v);
            },
            message: props => `${props.value} is not a valid github url!`,
        },
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('user', userSchema);

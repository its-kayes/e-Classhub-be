"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
const mongoose_1 = require("mongoose");
const trackerSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is must required'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    network: {
        ip: {
            type: String,
        },
        isp: {
            type: String,
        },
        connection: {
            type: String,
        },
        proxy: {
            type: Boolean,
        },
        vpn: {
            type: Boolean,
        },
        tor: {
            type: Boolean,
        },
    },
    browser: {
        name: {
            type: String,
        },
        version: {
            type: String,
        },
        major: {
            type: String,
        },
    },
    engine: {
        name: {
            type: String,
        },
        version: {
            type: String,
        },
    },
    os: {
        name: {
            type: String,
        },
        version: {
            type: String,
        },
    },
    device: {
        vendor: {
            type: String,
        },
        model: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    cpu: {
        architecture: {
            type: String,
        },
    },
    location: {
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        region: {
            type: String,
        },
        timezone: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        postal: {
            type: String,
        },
        org: {
            type: String,
        },
    },
}, {
    timestamps: true,
});
exports.Tracker = (0, mongoose_1.model)('tracker', trackerSchema);

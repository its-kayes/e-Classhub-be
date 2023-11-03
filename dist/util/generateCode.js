"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
const generateCode = () => {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
};
exports.generateCode = generateCode;

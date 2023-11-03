"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArabic = void 0;
// Check if text is in arabic or not
const isArabic = (word) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(word);
};
exports.isArabic = isArabic;

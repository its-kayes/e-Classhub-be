"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBengali = void 0;
// Check if text is in Bengali or not
const isBengali = (word) => {
    const bengaliRegex = /[\u0980-\u09FF]/;
    return bengaliRegex.test(word);
};
exports.isBengali = isBengali;

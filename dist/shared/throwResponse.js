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
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwResponse = void 0;
const throwResponse = (req, res, data, statusCode, message, success, meta) => __awaiter(void 0, void 0, void 0, function* () {
    let objectWithMeta = {};
    if (meta) {
        objectWithMeta = {
            success,
            statusCode: statusCode,
            message,
            meta: {
                page: meta === null || meta === void 0 ? void 0 : meta.page,
                limit: meta === null || meta === void 0 ? void 0 : meta.limit,
                total: meta === null || meta === void 0 ? void 0 : meta.total,
            },
            data: data,
        };
    }
    else {
        objectWithMeta = {
            success,
            statusCode: statusCode,
            message,
            data: data,
        };
    }
    return res.status(statusCode).json(objectWithMeta);
});
exports.throwResponse = throwResponse;

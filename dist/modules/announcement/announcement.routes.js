"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importStar(require("multer"));
const announcement_controller_1 = require("./announcement.controller");
const router = (0, express_1.Router)();
exports.AnnouncementRoutes = router;
const storage = (0, multer_1.memoryStorage)();
const upload = (0, multer_1.default)({ storage });
router.post('/create', upload.fields([{ name: 'materials', maxCount: 2 }]), announcement_controller_1.AnnouncementController.CreateAnnouncement);
router.get('/classroom/:classCode/:email', announcement_controller_1.AnnouncementController.GetAnnouncements);
router.delete('/delete', announcement_controller_1.AnnouncementController.DeleteAnnouncement);

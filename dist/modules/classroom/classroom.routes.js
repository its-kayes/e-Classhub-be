"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomRoutes = void 0;
const express_1 = require("express");
const classroom_controller_1 = require("./classroom.controller");
const router = (0, express_1.Router)();
exports.ClassroomRoutes = router;
router.post('/create', classroom_controller_1.ClassroomController.CreateClassroom);
router.get('/find/:classCode', classroom_controller_1.ClassroomController.FindClassroom);

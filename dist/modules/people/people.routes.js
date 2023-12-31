"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleRoutes = void 0;
const express_1 = require("express");
const people_controller_1 = require("./people.controller");
const router = (0, express_1.Router)();
exports.PeopleRoutes = router;
router.post('/join-classroom', people_controller_1.PeopleController.JoinClassroom); // Request to join a Classroom
router.get('/classroom/:status/:email/:classCode', people_controller_1.PeopleController.GetRequestedPeople); // Get Classroom & status based People list for a Classroom
router.patch('/change-status', people_controller_1.PeopleController.ChangeStatus);

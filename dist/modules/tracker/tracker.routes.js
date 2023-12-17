"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerRoutes = void 0;
const express_1 = require("express");
const tracker_controller_1 = require("./tracker.controller");
const router = (0, express_1.Router)();
exports.TrackerRoutes = router;
router.get('/user-history/:email', tracker_controller_1.TrackerController.GetUserBasedLogHistory);

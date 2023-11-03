"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRoutes = void 0;
const express_1 = require("express");
const healthCheck_controller_1 = require("./healthCheck.controller");
const router = (0, express_1.Router)();
exports.HealthCheckRoutes = router;
router.get('/get', healthCheck_controller_1.HealthCheckController.Get);

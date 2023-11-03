"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const express_1 = require("express");
const healthCheck_routes_1 = require("../modules/health-check/healthCheck.routes");
const user_routes_1 = require("../modules/user/user.routes");
const classroom_routes_1 = require("../modules/classroom/classroom.routes");
const people_routes_1 = require("../modules/people/people.routes");
const router = (0, express_1.Router)();
exports.v1 = router;
router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/health-check', healthCheck_routes_1.HealthCheckRoutes);
router.use('/user', user_routes_1.UserRoutes);
router.use('/classroom', classroom_routes_1.ClassroomRoutes);
router.use('/people', people_routes_1.PeopleRoutes);

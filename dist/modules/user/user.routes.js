"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
exports.UserRoutes = router;
router.get('/find-one', user_controller_1.UserController.FindUser); // Find One User
router.post('/sign-up', user_controller_1.UserController.UserSignUp); // Sign In User //TODO: Validator Middleware
router.post('/sign-in', user_controller_1.UserController.UserSignIn); // Sign Up User
router.patch('/update-name-title/:email', user_controller_1.UserController.UpdateNameTitle); // Update Name and Title

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http")); // Import http module
const http_status_1 = __importDefault(require("http-status"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const globalErrorHandler_1 = __importDefault(require("./errors/globalErrorHandler"));
const throwResponse_1 = require("./shared/throwResponse");
const socket_1 = __importDefault(require("./socket"));
const v1_1 = require("./versions/v1");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Create http server
exports.server = server;
app.set('serverTimeout', 300000);
const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
const options = [
    (0, cors_1.default)(corsOptions),
    (0, helmet_1.default)(),
    (0, morgan_1.default)('dev'),
    express_1.default.json({ limit: '50mb' }),
    express_1.default.urlencoded({ extended: true }),
];
app.use(...options);
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the e-ClassHub (Backend) server :3',
    });
});
app.use('/api/v1', v1_1.v1);
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
// Global Error Handler
app.use(globalErrorHandler_1.default);
// 404 handler
app.all('*', (req, res) => {
    return (0, throwResponse_1.throwResponse)(req, res, null, http_status_1.default.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`, false);
});
(0, socket_1.default)(server);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_1 = __importDefault(require("http-status"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const siteEnv_1 = require("./config/siteEnv");
const globalErrorHandler_1 = __importDefault(require("./errors/globalErrorHandler"));
const throwResponse_1 = require("./shared/throwResponse");
const v1_1 = require("./versions/v1");
const app = (0, express_1.default)();
app.set('serverTimeout', 300000);
let corsOptions;
switch (siteEnv_1.ALLOW_ALL_ORIGIN) {
    case 'true':
        corsOptions = {
            origin: '*',
            methods: '*',
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };
        break;
    case 'false':
        corsOptions = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            origin: (origin, callback) => {
                // Check if the request comes from your Google Play Store app
                if (isRequestFromValidateOrigin(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            methods: '*',
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };
        break;
    default:
        corsOptions = {
            origin: '*',
            methods: '*',
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };
        break;
}
const options = [
    (0, cors_1.default)(corsOptions),
    (0, helmet_1.default)(),
    (0, morgan_1.default)('dev'),
    express_1.default.json({ limit: '50mb' }),
    express_1.default.urlencoded({ extended: true }),
];
// Apply the middleware functions using the spread operator
app.use(...options);
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the e-ClassHub (Backend) server :3',
    });
});
// v1 APIs route
app.use('/api/v1', v1_1.v1);
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
// Global Error Handler
app.use(globalErrorHandler_1.default);
// 404 handler
app.all('*', (req, res) => {
    return (0, throwResponse_1.throwResponse)(req, res, null, http_status_1.default.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`, false);
});
function isRequestFromValidateOrigin(origin) {
    // console.log(origin);
    // log(origin || 'local', 'red');
    const allowedOrigins = siteEnv_1.ACCESSED_ORIGIN_LIST;
    return !!origin && allowedOrigins.includes(origin);
}
exports.default = app;

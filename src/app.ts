import cors, { CorsOptions } from 'cors';
import express, {
  Application,
  Request,
  RequestHandler,
  Response,
} from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import logger from 'morgan';
import path from 'path';
import globalErrorHandler from './errors/globalErrorHandler';
import { throwResponse } from './shared/throwResponse';
import { v1 } from './versions/v1';

const app: Application = express();

app.set('serverTimeout', 300000);

const corsOptions: CorsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const options: RequestHandler[] = [
  cors(corsOptions),
  helmet(),
  logger('dev'),
  express.json({ limit: '50mb' }),
  express.urlencoded({ extended: true }),
];

// Apply the middleware functions using the spread operator
app.use(...options);

app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Welcome to the e-ClassHub (Backend) server :3',
  });
});

// v1 APIs route
app.use('/api/v1', v1);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Global Error Handler
app.use(globalErrorHandler);

// 404 handler
app.all('*', (req: Request, res: Response) => {
  return throwResponse(
    req,
    res,
    null,
    httpStatus.NOT_FOUND,
    `Can't find ${req.originalUrl} on this server!`,
    false,
  );
});

export default app;

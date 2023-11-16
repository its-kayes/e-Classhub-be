import cors, { CorsOptions } from 'cors';
import express, {
  Application,
  Request,
  RequestHandler,
  Response,
} from 'express';
import helmet from 'helmet';
import http from 'http'; // Import http module
import httpStatus from 'http-status';
import logger from 'morgan';
import path from 'path';
// import socketIO from 'socket.io'; // Import socket.io
import globalErrorHandler from './errors/globalErrorHandler';
import { throwResponse } from './shared/throwResponse';
import { v1 } from './versions/v1';

import { Server } from 'socket.io'; // Import Server class from socket.io

const app: Application = express();
const server = http.createServer(app); // Create http server

// Create a new instance of socket.io using the Server class
const io = new Server(server);

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

app.use(...options);

app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Welcome to the e-ClassHub (Backend) server :3',
  });
});

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

// Add this event listener to handle socket.io connections
let users: { socketID: string }[] = [];

io.on('connection', socket => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', data => {
    console.log(data);
    io.emit('messageResponse', data);
  });

  socket.on('typing', data => socket.broadcast.emit('typingResponse', data));

  socket.on('newUser', data => {
    console.log('🚀: newUser -> data', data);

    users.push(data);
    io.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});

export { io, server }; // Export the server and io for use in server.ts

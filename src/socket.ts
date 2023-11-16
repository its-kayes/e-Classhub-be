import { Server as HttpServer } from 'http'; // Import http.Server
import { Server, Socket } from 'socket.io';

const configureSocketIO = (server: HttpServer) => {
  const socketIO = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
    },
  });

  let users: { socketID: string }[] = [];

  socketIO.on('connection', (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', data => {
      console.log(data);
      socketIO.emit('messageResponse', data);
    });

    socket.on('typing', data => socket.broadcast.emit('typingResponse', data));

    socket.on('newUser', data => {
      console.log('🚀: newUser -> data', data);
      users.push({ socketID: socket.id });
      socketIO.emit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id);
      socketIO.emit('newUserResponse', users);
    });
  });
};

export default configureSocketIO;

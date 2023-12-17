import { Server as HttpServer } from 'http'; // Import http.Server
import { Server, Socket } from 'socket.io';

const configureSocketIO = (server: HttpServer) => {
  const socketIO = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://eclasshub.kayes.dev'],
    },
  });

  let users: { socketID: string }[] = [];

  socketIO.on('connection', (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', data => {
      socketIO.emit('messageResponse', data);
    });

    socket.on('private-chat', data => {
      socketIO.emit(`private-chat-${data.room}`, data);
    });

    // Group Chat
    socket.on('group-chat', data => {
      socketIO.emit(`group-chat-${data.room}`, data);
    });

    // Typing Event
    socket.on('typing', data => {
      socketIO.emit(`who-typing-${data.room}`, data);
    });

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

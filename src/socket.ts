// import { io } from './app';

// let users: { socketID: string }[] = [];
// io.on('connection', socket => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on('message', data => {
//     console.log(data);
//     io.emit('messageResponse', data);
//   });

//   socket.on('typing', data => socket.broadcast.emit('typingResponse', data));

//   socket.on('newUser', data => {
//     console.log('🚀: newUser -> data', data);

//     users.push(data);
//     io.emit('newUserResponse', users);
//   });

//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//     users = users.filter(user => user.socketID !== socket.id);
//     io.emit('newUserResponse', users);
//     socket.disconnect();
//   });
// });

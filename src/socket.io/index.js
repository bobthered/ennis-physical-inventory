import socketio from 'socket.io';

export default server => {
  const io = socketio(server);

  // listen for socket.io connection
  io.on('connection', socket => {
    // log connection
    console.log('SOCKET.IO - connection');
  });
};

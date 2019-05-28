const express = require('express');
const path = require('path');
const socketIO = require('socket.io');


let PORT = 3000;
const INDEX = path.join(__dirname, 'console.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on("shoot", (payload) => {
    console.log(payload);
    socket.broadcast.emit("shoot", `${payload.x}#${payload.y}`);
  });

});
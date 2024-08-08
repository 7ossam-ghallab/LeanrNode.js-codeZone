const express = require('express')
const {join} = require('path')
const {Server} = require('socket.io')
const http = require('http')


const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

// io => all collection 
// socket => my single socket
io.on('connection', (socket) => {
  console.log(`a user id [${socket.id}] connected`);
  // socket.on('disconnect', () => {
  //   console.log(`user id [${socket.id}] disconnected`);
  // });
  socket.on('chat message', (msg) => {
    // console.log(`message from user id [${socket.id}]: ${msg}`);
    io.emit('send messages to all users', msg);
  });
  socket.on('typing', () => {
    socket.broadcast.emit('show_typing_status')
  })
  socket.on('stop_typing', () => {
    socket.broadcast.emit('clear_typing_status')
  })
});

/**
* emit -> publish to an event using emit('eventName', data)
*
* on -> listen to event using .on('eventName', callback)
*/

 

server.listen(5000, ()=> {
  console.log('listening on https://localhost:5000')
})
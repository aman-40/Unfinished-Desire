import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow all origins for dev
    methods: ["GET", "POST"]
  }
});

let waitingUser = null; // for stranger matching

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Default: Join global room
  socket.join('global_room');
  socket.emit('joined_global', { roomId: 'global_room', message: 'Welcome to the global room!' });

  // Handle user meta data when they connect
  socket.on('set_user_data', (userData) => {
    socket.data.user = userData;
  });

  socket.on('send_global_message', (messageData) => {
    io.to('global_room').emit('receive_global_message', {
      id: Date.now().toString() + Math.random(),
      from: socket.data.user?.name || 'Anonymous',
      senderId: socket.id,
      text: messageData.text,
      time: new Date().toISOString()
    });
  });

  // Matchmaking
  socket.on('find_stranger', () => {
    if (waitingUser && waitingUser.id !== socket.id) {
      // Match found
      const room = `room_${waitingUser.id}_${socket.id}`;
      socket.join(room);
      waitingUser.join(room);

      // Notify both
      io.to(room).emit('match_found', {
        roomId: room,
        message: "You're now chatting with a stranger."
      });

      // Clear waiting user
      waitingUser = null;
    } else {
      waitingUser = socket;
      socket.emit('waiting_for_match');
    }
  });

  // Leave stranger room
  socket.on('leave_room', (roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit('partner_disconnected', { roomId });
  });

  // Private messages
  socket.on('send_private_message', (data) => {
    io.to(data.roomId).emit('receive_private_message', {
      roomId: data.roomId,
      id: Date.now().toString() + Math.random(),
      from: socket.data.user?.name || 'Stranger',
      senderId: socket.id,
      text: data.text,
      time: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    if (waitingUser && waitingUser.id === socket.id) {
      waitingUser = null;
    }
    // Rooms are automatically left upon disconnect, but we want to notify partners in 1on1 rooms
    for (const room of socket.rooms) {
      if (room.startsWith('room_')) {
        socket.to(room).emit('partner_disconnected', { roomId: room });
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log('Server running on', port);
});

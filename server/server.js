import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { RoomManager } from './rooms.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class WebSocketServer {
    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        this.roomManager = new RoomManager();

        this.setupSocketHandlers();
    }

    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log(`User connected: ${socket.id}`);

            // Handle room joining
            socket.on('joinRoom', (roomId) => {
                this.handleJoinRoom(socket, roomId);
            });

            // Handle drawing events
            socket.on('draw', (data) => {
                this.handleDraw(socket, data);
            });

            // Handle undo/redo events
            socket.on('undo', (roomId) => {
                this.handleUndo(socket, roomId);
            });

            socket.on('redo', (roomId) => {
                this.handleRedo(socket, roomId);
            });

            // Handle cursor movement
            socket.on('cursorMove', (data) => {
                this.handleCursorMove(socket, data);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                this.handleDisconnect(socket);
            });

            // Handle ping messages for latency monitoring
            socket.on('ping', () => {
                socket.emit('pong');
            });
        });
    }

    handleJoinRoom(socket, roomId) {
        const room = this.roomManager.getOrCreateRoom(roomId);
        room.addUser(socket.id);
        socket.join(roomId);

        // Send current state to new user
        socket.emit('roomState', room.getState());

        // Notify other users
        socket.to(roomId).emit('userJoined', {
            userId: socket.id,
            userCount: this.io.sockets.adapter.rooms.get(roomId)?.size || 0
        });
    }

    handleDraw(socket, data) {
        const room = this.roomManager.getRoom(data.roomId);
        if (!room) return;

        room.addPath(data.path);
        socket.to(data.roomId).emit('draw', {
            userId: socket.id,
            path: data.path
        });
    }

    handleUndo(socket, roomId) {
        console.log('Server received undo request from', socket.id, 'for room', roomId);
        const room = this.roomManager.getRoom(roomId);
        if (!room) {
            console.log('Room not found:', roomId);
            return;
        }

        // Broadcast to all clients in the room, including sender
        this.io.to(roomId).emit('undoPath', { userId: socket.id });
    }

    handleRedo(socket, roomId) {
        console.log('Server received redo request from', socket.id, 'for room', roomId);
        const room = this.roomManager.getRoom(roomId);
        if (!room) {
            console.log('Room not found:', roomId);
            return;
        }

        // Broadcast to all clients in the room, including sender
        this.io.to(roomId).emit('redoPath', { userId: socket.id });
    }

    handleCursorMove(socket, data) {
        socket.to(data.roomId).emit('cursorMove', {
            userId: socket.id,
            x: data.x,
            y: data.y
        });
    }

    handleDisconnect(socket) {
        this.roomManager.handleUserDisconnect(socket.id);
        console.log(`User disconnected: ${socket.id}`);
    }
}

// Create and configure the server
const app = express();
const server = createServer(app);
const wsServer = new WebSocketServer(server);
const port = process.env.PORT || 3000;

// Serve static files from the client directory with proper MIME types
app.use(express.static(join(__dirname, '../client'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Additional security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// Start the server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
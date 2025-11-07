# Real-Time Collaborative Drawing Canvas

A powerful real-time collaborative drawing application that enables multiple users to create artwork together simultaneously. Experience seamless real-time synchronization, intuitive drawing tools, and smooth user interaction.

🔗 [Live Demo](https://collaborative-drawing-canvas.onrender.com)

[![Drawing Demo](https://img.shields.io/badge/Demo-Live-success)](https://collaborative-drawing-canvas.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

### Drawing Tools
- 🖌️ Smooth brush tool with pressure sensitivity
- ⚪ Eraser tool with adjustable size
- 🎨 Color picker with color memory
- 📏 Adjustable stroke width slider
- ↩️ Global Undo/Redo functionality

### Collaboration Features
- 👥 Real-time multi-user drawing
- 🔄 Instant synchronization across all users
- 👆 Live cursor position tracking
- 👤 Online user indicator
- 🔌 Connection status monitoring
- 📊 Performance metrics (FPS & Latency)

### Room Management
- 🏠 Multiple drawing rooms
- 🔗 Shareable room links
- 🆕 Create new room option
- 📋 One-click room link copying

### Technical Features
- ⚡ Optimized canvas operations
- 🔄 Efficient WebSocket communication
- 📱 Responsive design for all devices
- 🎯 Low-latency drawing experience

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Nagur-Meera/collaborative-drawing-canvas.git
   cd collaborative-drawing-canvas
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   node server/server.js
   ```

4. **Open the Application**
   - Navigate to `http://localhost:3000`
   - Share the URL with others to draw together

## 💻 Technology Stack

- **Frontend**:
  - HTML5 Canvas API for drawing operations
  - Vanilla JavaScript (ES6+) for DOM manipulation
  - CSS3 with modern design principles

- **Backend**:
  - Node.js for server runtime
  - Express.js for HTTP server
  - Socket.io for real-time communication

## 🎮 How to Use

1. **Getting Started**
   - Open the application URL
   - You'll automatically join a new room or use a shared room link

2. **Drawing Tools**
   - Select brush/eraser from the toolbar
   - Use the color picker to choose colors
   - Adjust stroke width with the slider
   - Use undo/redo buttons for corrections


## 🔧 Architecture

- **Client-Side**: Modular JavaScript architecture with separate concerns:
  - `canvas.js`: Handles drawing operations
  - `websocket.js`: Manages real-time communication
  - `main.js`: Coordinates application flow

- **Server-Side**: Robust Node.js implementation:
  - `server.js`: Main server setup
  - `rooms.js`: Room management system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔍 Known Limitations

- Maximum recommended concurrent users per room: 10
- Canvas size is fixed at load time
- Undo/redo limited to last 50 actions

## 📊 Performance

- Average latency: <100ms
- Consistent 60 FPS on modern browsers
- Optimized for desktop and tablet use

## 🙏 Acknowledgments

- Socket.io team for the robust real-time engine
- Express.js community for the excellent server framework

---

Built with ❤️ by [Nagur-Meera](https://github.com/Nagur-Meera)

A real-time collaborative drawing application that allows multiple users to draw on the same canvas simultaneously.

## Features

- Real-time drawing synchronization
- Multiple drawing tools (brush, eraser)
- Color picker and stroke width adjustment
- Global undo/redo system
- Real-time cursor tracking
- Room-based collaboration
- Responsive design
- Touch device support

## Tech Stack

- **Frontend**: Vanilla TypeScript, HTML5 Canvas, WebSocket (Socket.IO client)
- **Backend**: Node.js, Express, Socket.IO
- **Language**: TypeScript

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open http://localhost:3000 in your browser

## Testing with Multiple Users

1. Open the application in multiple browser windows/tabs
2. Share the room URL with others (the room ID is in the URL query parameter)
3. Start drawing and see real-time updates across all connected clients

## Development

To run in development mode with auto-reload:
```bash
npm run dev
```


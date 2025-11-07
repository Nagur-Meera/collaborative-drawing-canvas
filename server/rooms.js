class DrawingStateManager {
    constructor() {
        this.state = {
            paths: [],
            undoStack: [],
            redoStack: []
        };
    }

    addPath(path) {
        this.state.paths.push(path);
        this.state.redoStack = []; // Clear redo stack when new path is added
    }

    undo(userId) {
        const lastPathIndex = this.findLastPathIndexByUser(userId);
        if (lastPathIndex === -1) return null;

        const path = this.state.paths[lastPathIndex];
        const undoItem = {
            pathId: path.id,
            userId,
            path: { ...path },
            timestamp: Date.now()
        };

        // Remove the path and add to undo stack
        this.state.paths.splice(lastPathIndex, 1);
        this.state.undoStack.push(undoItem);

        return undoItem;
    }

    redo(userId) {
        // Find the last undo item for this user
        const redoIndex = this.state.undoStack
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => item.userId === userId)
            .pop();
        
        if (!redoIndex) return null;

        const item = this.state.undoStack.splice(redoIndex.index, 1)[0];
        const redoPath = {
            ...item.path,
            redoTimestamp: Date.now()
        };
        
        // Add the path back to the paths array
        this.state.paths.push(redoPath);
        return { userId, path: redoPath };
    }

    findLastPathIndexByUser(userId) {
        for (let i = this.state.paths.length - 1; i >= 0; i--) {
            if (this.state.paths[i].userId === userId) {
                return i;
            }
        }
        return -1;
    }

    getState() {
        return this.state;
    }
}

class Room {
    constructor(id) {
        this.id = id;
        this.users = new Set();
        this.drawingState = new DrawingStateManager();
    }

    addUser(userId) {
        this.users.add(userId);
    }

    removeUser(userId) {
        this.users.delete(userId);
    }

    isEmpty() {
        return this.users.size === 0;
    }

    getState() {
        return this.drawingState.getState();
    }

    addPath(path) {
        this.drawingState.addPath(path);
    }

    undo(userId) {
        return this.drawingState.undo(userId);
    }

    redo(userId) {
        return this.drawingState.redo(userId);
    }
}

class RoomManager {
    constructor() {
        this.rooms = new Map();
    }

    getOrCreateRoom(roomId) {
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, new Room(roomId));
        }
        return this.rooms.get(roomId);
    }

    getRoom(roomId) {
        return this.rooms.get(roomId);
    }

    handleUserDisconnect(userId) {
        this.rooms.forEach((room, roomId) => {
            room.removeUser(userId);
            if (room.isEmpty()) {
                this.rooms.delete(roomId);
            }
        });
    }
}

// Export the RoomManager class
export { RoomManager };
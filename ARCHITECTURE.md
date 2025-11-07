# Collaborative Canvas Architecture

## Data Flow Diagram

```
User Action → Canvas Event → WebSocket Client → Server → Room Manager → Broadcast → Other Clients → Canvas Update
```

### Detailed Flow:
1. User performs drawing action
2. Canvas captures points and creates path
3. WebSocket client sends event
4. Server validates and broadcasts
5. Other clients receive and apply changes
6. Canvas updates in real-time

## WebSocket Protocol

### Messages Types:

1. **Drawing Events**
```javascript
{
  type: 'draw',
  roomId: string,
  path: {
    id: string,
    points: Array<{x: number, y: number, pressure: number}>,
    color: string,
    width: number,
    tool: string,
    userId: string
  }
}
```

2. **Undo/Redo Events**
```javascript
{
  type: 'undo/redo',
  roomId: string,
  userId: string,
  pathId: string
}
```

3. **Cursor Events**
```javascript
{
  type: 'cursorMove',
  roomId: string,
  userId: string,
  x: number,
  y: number
}
```

## Undo/Redo Strategy

### Local Operations:
1. Maintain path history array
2. Store user ID with each path
3. Push to redo stack on undo
4. Pop from redo stack on redo

### Global Operations:
1. Broadcast undo/redo events
2. Include user ID for ownership
3. Maintain consistent state across clients
4. Version tracking for conflict resolution

## Performance Decisions

1. **Canvas Optimization**
   - Using `willReadFrequently` flag for better performance
   - Quad curves for smooth lines
   - Event throttling for cursor updates

2. **Network Optimization**
   - Batch drawing points
   - Throttle cursor position updates
   - Compress path data

3. **State Management**
   - Local state updates first
   - Server validation second
   - Broadcast to other clients last

## Conflict Resolution

### Drawing Conflicts:
1. Last-write-wins for overlapping paths
2. Maintain path order consistently
3. User ID and timestamps for ordering

### Undo/Redo Conflicts:
1. User can only undo their own actions
2. Server maintains authoritative state
3. Version control prevents conflicts

## Room Management

1. **Room Creation**
   - Generate unique room ID
   - Initialize room state
   - Track active users

2. **State Persistence**
   - Store paths per room
   - Maintain user lists
   - Handle disconnections

## Performance Monitoring

1. **Client Metrics**
   - FPS counter
   - Latency tracking
   - WebSocket connection status

2. **Server Metrics**
   - Active connections
   - Room count
   - Message throughput
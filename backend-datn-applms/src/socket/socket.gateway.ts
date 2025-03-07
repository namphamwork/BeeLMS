import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { RoomChatsService } from 'src/roomChat/roomchats.service';
import { SocketStateService } from './socketstate.service';

@WebSocketGateway({
  cors: {
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly authService: AuthService, 
    private readonly roomChatsService: RoomChatsService,
    private readonly socketStateService: SocketStateService
  ) { }

  afterInit(socket: Socket): any { }

  async handleConnection(socket: Socket): Promise<any> {
    const token = socket.handshake.query.token;
    if (token) {
      try {
        socket.data = await this.authService.handleVerifyToken(token as string);
        socket.join(socket.data.id);
        const userId = socket.data.id;
        this.socketStateService.markUserOnline(userId);
        socket.broadcast.emit('userOnline', { userId });
      } catch (error) {
        socket.disconnect()
      }
    } else {
      socket.disconnect()
    }
  }

  async handleDisconnect(socket: Socket) {
    const userId = socket.data.id;
    this.socketStateService.markUserOffline(userId);
    socket.broadcast.emit('userOffline', { userId });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() roomId: string): Promise<void> {
    socket.join(roomId);
  }

  @SubscribeMessage('joinRooms')
  async handleJoinRooms(@ConnectedSocket() socket: Socket, @MessageBody() roomIds: string[]): Promise<void> {
    socket.join(roomIds);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() body: any): Promise<void> {
    const { roomId, sender, message } = body;
    const savedMessage = await this.roomChatsService.saveMessage(roomId, sender, message);
    this.server.to(roomId).emit('message', {roomId, savedMessage});
  }
}

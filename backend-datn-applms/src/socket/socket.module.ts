import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UserModel } from 'src/users/user.model';
import { ClassroomModel } from 'src/classrooms/classroom.model';
import { RoomChatsService } from 'src/roomChat/roomchats.service';
import { RoomChatModel } from 'src/roomChat/roomchat.model';
import { SocketStateService } from './socketstate.service';

@Module({
  imports: [UserModel, ClassroomModel, RoomChatModel],
  providers: [SocketGateway, AuthService, UsersService, JwtService, UsersModule, RoomChatsService, SocketStateService],
})
export class SocketModule { }

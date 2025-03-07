import { Module } from '@nestjs/common';
import { RoomChatsController } from './roomchats.controller';
import { RoomChatsService } from './roomchats.service';
import { RoomChatModel } from './roomchat.model';
import { JwtService } from '@nestjs/jwt';
import { ClassroomModel } from 'src/classrooms/classroom.model';

@Module({
  imports: [RoomChatModel, ClassroomModel],
  controllers: [RoomChatsController],
  providers: [RoomChatsService, JwtService],
})
export class RoomChatsModule { }

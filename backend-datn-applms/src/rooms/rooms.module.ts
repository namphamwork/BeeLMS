import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomModel } from './room.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RoomModel],
  controllers: [RoomsController],
  providers: [RoomsService, JwtService],
})
export class RoomsModule { }

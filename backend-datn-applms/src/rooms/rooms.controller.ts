import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './rooms.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('api/v1/rooms')
@ApiTags('Rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all rooms', operationId: 'getAllRooms' })
  async getAllRooms(): Promise<Room[]> {
    return this.roomsService.getAllRooms();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get room by ID', operationId: 'getRoomById' })
  async getRoomById(@Param('id') id: string): Promise<Room> {
    return this.roomsService.getRoomById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new room', operationId: 'createRoom' })
  async createRoom(@Body() room: CreateRoomDto): Promise<Room> {
    return this.roomsService.createRoom(room);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update room by ID', operationId: 'updateRoom' })
  async updateRoom(@Param('id') id: string, @Body() room: Room): Promise<Room> {
    return this.roomsService.updateRoom(id, room);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete room by ID', operationId: 'deleteRoom' })
  async deleteRoom(@Param('id') id: string): Promise<void> {
    return this.roomsService.deleteRoom(id);
  }
}

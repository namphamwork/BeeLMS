import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoomChat } from './roomchat.model';
import { CreateRoomChatDto } from './roomchats.dto';
import { RoomChatsService } from './roomchats.service';

@Controller('api/v1/roomchats')
@ApiTags('RoomChats')
export class RoomChatsController {
  constructor(private readonly roomChatsService: RoomChatsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all roomChats', operationId: 'getAllRoomChats' })
  async getAllRoomChats(): Promise<RoomChat[]> {
    return this.roomChatsService.getAllRoomChats();
  }

  @Get('mychatroom')
  @ApiOperation({
    summary: 'Get all my classrooms',
    operationId: 'getAllMyClassrooms',
  })
  @UseGuards(AuthGuard)
  async getAllMyClassrooms(@Req() req: any): Promise<RoomChat[]> {
    return this.roomChatsService.getAllMyChatrooms(req.user_data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get roomChat by ID', operationId: 'getRoomChatById' })
  async getRoomChatById(@Param('id') id: string): Promise<RoomChat> {
    return this.roomChatsService.getRoomChatById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new roomChat', operationId: 'createRoomChat' })
  async createRoomChat(@Body() roomChat: CreateRoomChatDto): Promise<RoomChat> {
    return this.roomChatsService.createRoomChat(roomChat);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update roomChat by ID', operationId: 'updateRoomChat' })
  async updateRoomChat(@Param('id') id: string, @Body() roomChat: RoomChat): Promise<RoomChat> {
    return this.roomChatsService.updateRoomChat(id, roomChat);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete roomChat by ID', operationId: 'deleteRoomChat' })
  async deleteRoomChat(@Param('id') id: string): Promise<void> {
    return this.roomChatsService.deleteRoomChat(id);
  }
}

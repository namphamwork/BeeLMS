import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.model';
import { createResponse } from '../util/util';
import { CreateRoomDto } from './rooms.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async getAllRooms(): Promise<any> {
    try {
      const rooms = await this.roomModel.find().exec();
      return createResponse(200, 'Success', rooms);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getRoomById(id: string): Promise<any> {
    try {
      const room = await this.roomModel.findById(id).exec();
      if (room) {
        return createResponse(200, 'Success', room);
      } else {
        return createResponse(404, 'Room not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createRoom(room: CreateRoomDto): Promise<any> {
    try {
      const createdRoom = new this.roomModel(room);
      await createdRoom.save();
      return createResponse(201, 'Room created', createdRoom);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateRoom(id: string, room: Room): Promise<any> {
    try {
      const updatedRoom = await this.roomModel
        .findByIdAndUpdate(id, room, { new: true })
        .exec();
      if (updatedRoom) {
        return createResponse(200, 'Room updated', updatedRoom);
      } else {
        return createResponse(404, 'Room not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteRoom(id: string): Promise<any> {
    try {
      const deletedRoom = await this.roomModel.findByIdAndDelete(id).exec();
      if (deletedRoom) {
        return createResponse(200, 'Room deleted', deletedRoom);
      } else {
        return createResponse(404, 'Room not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

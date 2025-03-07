import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema, Types } from 'mongoose';
import { RoomChat } from './roomchat.model';
import { createResponse } from '../util/util';
import { CreateRoomChatDto } from './roomchats.dto';
import { Classroom } from 'src/classrooms/classroom.model';
import { User } from 'src/users/user.model';

@Injectable()
export class RoomChatsService {
  constructor(
    @InjectModel('RoomChat') private readonly roomChatModel: Model<RoomChat>,
    @InjectModel('Classroom') private readonly classroomModel: Model<Classroom>,
  ) {}

  async getAllRoomChats(): Promise<any> {
    try {
      const roomChats = await this.roomChatModel.find().populate([
        {path: 'participants', select: 'fullname username avatar code role' },
        {
          path: 'messages',
          select: '',
          populate: [
            { path: 'sender', select: 'fullname username avatar code role' }
          ]
        },
      ]).exec();
      return createResponse(200, 'Success', roomChats);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getRoomChatById(id: string): Promise<any> {
    try {
      const roomChat = await this.roomChatModel.findById(id).populate([
        {path: 'participants', select: 'fullname username avatar code role' },
        {
          path: 'messages',
          select: '',
          populate: [
            { path: 'sender', select: 'fullname username avatar code role' }
          ]
        },
      ]).exec();
      if (roomChat) {
        return createResponse(200, 'Success', roomChat);
      } else {
        return createResponse(404, 'RoomChat not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getAllMyChatrooms(user: User): Promise<any> {
    const { id, role } = user;
    
    try {
      const chatrooms = await this.roomChatModel
      .find({participants: id})
      .populate([
        {path: 'participants', select: 'fullname username avatar code role' },
        {
          path: 'messages',
          select: '',
          populate: [
            { path: 'sender', select: 'fullname username avatar code role' }
          ]
        },
      ])
      .exec();
      return createResponse(200, 'Success', chatrooms);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createRoomChat(roomChat: CreateRoomChatDto): Promise<any> {
    const {classroomId} = roomChat
    
    try {
      const classroom = await this.classroomModel.findById(classroomId)
      if(!classroom){
        return createResponse(404, 'Classroom not found');
      }
      const intructorId = classroom.instructor.toString()
      
      const participants = classroom.learners.map(id=>id.toString())
      participants.push(intructorId)
      
      const newRoomChat = {
        title: `[${classroom.code}] ${classroom.title}`,
        participants: participants,
        classroom: classroomId
      }
      
      const createdRoomChat = new this.roomChatModel(newRoomChat);
      
      await createdRoomChat.save();
      return createResponse(201, 'RoomChat created');
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateRoomChat(id: string, roomChat: RoomChat): Promise<any> {
    try {
      const updatedRoomChat = await this.roomChatModel
        .findByIdAndUpdate(id, roomChat, { new: true })
        .exec();
      if (updatedRoomChat) {
        return createResponse(200, 'RoomChat updated', updatedRoomChat);
      } else {
        return createResponse(404, 'RoomChat not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteRoomChat(id: string): Promise<any> {
    try {
      const deletedRoomChat = await this.roomChatModel.findByIdAndDelete(id).exec();
      if (deletedRoomChat) {
        return createResponse(200, 'RoomChat deleted', deletedRoomChat);
      } else {
        return createResponse(404, 'RoomChat not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async saveMessage(roomId: string, sender: ObjectId, message: string): Promise<any> {
    try {
      const roomChat = await this.roomChatModel.findById(roomId).exec();
      if (!roomChat) {
        throw new Error('RoomChat not found');
      }
      
      const newMessage = {
        sender,
        message
      }
      
      roomChat.messages.push(newMessage);
      await roomChat.save();

      const resNewMessage = await this.roomChatModel.findById(roomId).populate([
        {path:'messages', populate: [{ path: 'sender', select: 'fullname username avatar code role' }]}
      ]).exec();

      if(resNewMessage.messages && resNewMessage.messages.length > 0){
        return resNewMessage.messages[resNewMessage.messages.length - 1];
      }
    } catch (error) {
      throw new Error('Failed to save message: ' + error.message);
    }
  }
}

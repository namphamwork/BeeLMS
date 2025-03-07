import { Classroom } from "./Classroom";
import { Response } from "./Response";
import { User } from "./User";

export interface Message {
  _id: string;
  roomId: string;
  sender: User;
  message: string;
  createAt: string;
}

export interface ChatRoom {
  _id: string;
  title: string;
  participants: User[];
  classroom: Pick<Classroom, "_id">;
  isDelete: boolean;
  messages: Message[];
}

export type ChatRoomsResponse = Response<ChatRoom[]>;
export type ChatRoomResponse = Response<ChatRoom>;

import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document, ObjectId } from 'mongoose';
import { Classroom } from 'src/classrooms/classroom.model';
import { User } from 'src/users/user.model';

export interface RoomChat extends Document {
  title: string
  participants: User[]
  classroom: Classroom
  messages: {
    sender: Schema.Types.ObjectId;
    message:string,
    createAt?: Date
  }[]
  isDelete: boolean
}

export const RoomChatSchema = new Schema({
  title: { type: String, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', require: true }],
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', require: true },
  messages: {
    type:[
      {
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        message: { type: String, required: true },
        createAt: {type:Date, default: Date.now}
      }
    ],
    default: [],
  },
  isDelete: {type:Boolean, default:false}
}, { timestamps: true });

export const RoomChatModel = MongooseModule.forFeature([
  { name: 'RoomChat', schema: RoomChatSchema },
]);

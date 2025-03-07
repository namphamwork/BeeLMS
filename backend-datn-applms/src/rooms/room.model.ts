import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';

export interface Room extends Document {
  title: string;
}

export const RoomSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true },
);

export const RoomModel = MongooseModule.forFeature([
  { name: 'Room', schema: RoomSchema },
]);

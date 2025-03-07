import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';

export interface Assignment extends Document {
  title: string;
  description: string;
  weight: number;
}

export const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    weight: { type: Number, default: 0 }
  },
  { timestamps: true },
);

export const AssignmentModel = MongooseModule.forFeature([
  { name: 'Assignment', schema: AssignmentSchema },
]);

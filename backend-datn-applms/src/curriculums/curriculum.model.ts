import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';

export interface Curriculum extends Document {
  originalname: string;
  filename: string;
  size: number;
  type: string;
}

export const CurriculumSchema = new Schema(
  {
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);

export const CurriculumModel = MongooseModule.forFeature([
  { name: 'Curriculum', schema: CurriculumSchema },
]);

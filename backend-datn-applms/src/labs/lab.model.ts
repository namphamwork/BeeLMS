import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';

export interface Lab extends Document {
  title: string;
  description: string;
  weight: number;
}

export const LabSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    weight: { type: Number, default: 0 }
  },
  { timestamps: true },
);

export const LabModel = MongooseModule.forFeature([
  { name: 'Lab', schema: LabSchema },
]);

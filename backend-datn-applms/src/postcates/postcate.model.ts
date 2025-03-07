import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';

export interface PostCateType extends Document {
  title: string;
}

export const PostCateSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true },
);

export const PostCateModel = MongooseModule.forFeature([
  { name: 'PostCate', schema: PostCateSchema },
]);

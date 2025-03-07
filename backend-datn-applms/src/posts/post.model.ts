import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { PostCateType } from 'src/postcates/postcate.model';

export interface PostType extends Document {
  title: string;
  description: string;
  category: PostCateType
}

export const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category:{ type: Schema.Types.ObjectId, ref: 'PostCate', required: true },
  },
  { timestamps: true },
);

export const PostModel = MongooseModule.forFeature([
  { name: 'Post', schema: PostSchema },
]);

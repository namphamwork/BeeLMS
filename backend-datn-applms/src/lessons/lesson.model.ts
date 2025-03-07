import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Quiz } from 'src/quizs/quiz.model';

export interface Lesson extends Document {
  title: string;
  description: string;
  videos: {
    title: string;
    urlVideo: string[];
    duration: string;
  }[];
  quizs: Quiz[]
}

export const LessonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videos: {
      type: [
        {
          title: { type: String, required: true },
          urlVideo: { type: String, required: true },
          duration: { type: String, required: true },
        },
      ],
      default: [],
    },
    quizs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Quiz', default: null }],
      default: [],
    },
  },
  { timestamps: true },
);

export const LessonModel = MongooseModule.forFeature([
  { name: 'Lesson', schema: LessonSchema },
]);

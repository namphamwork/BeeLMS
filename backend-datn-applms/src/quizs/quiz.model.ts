import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';

export interface Quiz extends Document {
  title: string;
  description: string;
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string[];
  }[];
  weight: number;
}

export const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: {
      type: [{
        question: { type: String, required: true },
        answers: { type: [String], required: true },
        correctAnswer: { type: [String], required: true },
      }],
      default: [],
    },
    weight: { type: Number, default: 0 }
  },
  { timestamps: true },
);

export const QuizModel = MongooseModule.forFeature([
  { name: 'Quiz', schema: QuizSchema },
]);

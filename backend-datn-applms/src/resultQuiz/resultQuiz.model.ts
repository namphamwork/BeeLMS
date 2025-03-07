import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Classroom } from 'src/classrooms/classroom.model';
import { Course } from 'src/courses/course.model';
import { Quiz } from 'src/quizs/quiz.model';
import { User } from 'src/users/user.model';

export interface ResultQuiz extends Document {
  classroom: Classroom;
  course: Course;
  learner: User;
  quiz: Quiz;
  answerQuestions: answerQuestion[];
  score: number;
}

export interface answerQuestion extends Document {
  question: string;
  answer: string[];
}

export const ResultQuizSchema = new Schema(
  {
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    learner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    answerQuestions: { type: [
      {
        question: { type: String, required: true },
        answer: { type: [String], required: true },
      }
    ], required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true },
);

export const ResultQuizModel = MongooseModule.forFeature([
  { name: 'ResultQuiz', schema: ResultQuizSchema },
]);

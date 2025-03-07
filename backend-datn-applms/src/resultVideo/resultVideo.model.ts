import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Course } from 'src/courses/course.model';
import { User } from 'src/users/user.model';

export interface ResultVideo extends Document {
  course: Course;
  learner: User;
  video: string;
}

export const ResultVideoSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    learner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    video: { type: String, required: true },
  },
  { timestamps: true },
);

export const ResultVideoModel = MongooseModule.forFeature([
  { name: 'ResultVideo', schema: ResultVideoSchema },
]);

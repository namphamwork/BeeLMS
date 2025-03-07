import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Classroom } from 'src/classrooms/classroom.model';
import { Course } from 'src/courses/course.model';
import { User } from 'src/users/user.model';

export interface ResultLab extends Document {
  classroom: Classroom;
  course: Course;
  learner: User;
  lab: string;
  originalname: string;
  filename: string;
  size: number;
  type: string;
}

export const ResultLabSchema = new Schema(
  {
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    learner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lab: { type: Schema.Types.ObjectId, ref: 'Lab', required: true },
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);

export const ResultLabModel = MongooseModule.forFeature([
  { name: 'ResultLab', schema: ResultLabSchema },
]);

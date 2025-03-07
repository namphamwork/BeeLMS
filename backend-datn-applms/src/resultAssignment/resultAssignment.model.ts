import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Classroom } from 'src/classrooms/classroom.model';
import { Course } from 'src/courses/course.model';
import { User } from 'src/users/user.model';

export interface ResultAssignment extends Document {
  classroom: Classroom;
  course: Course;
  learner: User;
  assignment: string;
  originalname: string;
  filename: string;
  size: number;
  type: string;
}

export const ResultAssignmentSchema = new Schema(
  {
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    learner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);

export const ResultAssignmentModel = MongooseModule.forFeature([
  { name: 'ResultAssignment', schema: ResultAssignmentSchema },
]);

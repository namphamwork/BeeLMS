import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Assignment } from 'src/assignments/assignment.model';
import { Curriculum } from 'src/curriculums/curriculum.model';
import { Lab } from 'src/labs/lab.model';
import { Lesson } from 'src/lessons/lesson.model';
import { User } from 'src/users/user.model';

export interface Course extends Document {
  title: string;
  description: string;
  thumbnail: string;
  createBy: User;
  curriculums: Curriculum[];
  lessons: Lesson[];
  labs: Lab[];
  assignments: Assignment[];
  isActive: boolean;
  isDelete: boolean;
}

export const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: false },
    createBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    curriculums: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Curriculum', default: null }],
      default: [],
    },
    lessons: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Lesson', default: null }],
      default: [],
    },
    labs: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Lab', default: null }],
      default: [],
    },
    assignments: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Assignment', default: null }],
      default: [],
    },
    isActive: {type: Boolean, default: false},
    isDelete: {type: Boolean, default: false}
  },
  { timestamps: true },
);

export const CourseModel = MongooseModule.forFeature([
  { name: 'Course', schema: CourseSchema },
]);

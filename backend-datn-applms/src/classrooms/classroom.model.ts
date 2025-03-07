import { MongooseModule } from '@nestjs/mongoose';
import { Schema, Document, ObjectId } from 'mongoose';
import { Course } from 'src/courses/course.model';
import { Room } from 'src/rooms/room.model';
import { User } from 'src/users/user.model';

export interface Classroom extends Document {
  code: string;
  title: string;
  createBy: User;
  instructor: User;
  learners: User[];
  hours: number;
  dayOfWeek: string;
  dateStart: Date;
  dateEnd: Date;
  attendances: string[];
  marks: Mark[];
  course: Course;
  room: Room;
  isActive: boolean;
  isDelete: boolean;
}


export interface Attendance extends Document {
  _id: ObjectId;
  date: Date;
  learners: User[];
}
export interface Mark extends Document {
  _id: ObjectId;
  learner: User;
  scores: Score[];
}

export interface Score extends Document {
  _id: ObjectId;
  modelType: 'Lab' | 'Quiz';
  score: ObjectId;
  value: number | null;
}

export const ClassroomSchema = new Schema(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    createBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    learners: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User', default: null }],
      default: [],
    },
    hours: { type: Number, enum: [1, 2, 3, 4, 5, 6], required: true },
    dayOfWeek: { type: String, enum: ['246', '357'], required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    attendances: {
      type: [
        {
          date: { type: Date },
          learners: {
            type: [{ type: Schema.Types.ObjectId, ref: 'User', default: null }],
            default: [],
          },
        },
      ],
      default: [],
    },
    marks: {
      type: [
        {
          learner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
          scores: {
            type: [
              {
                modelType: {
                  type: String,
                  required: true,
                  enum: ['Lab', 'Quiz', 'Assignment'],
                },
                score: {
                  type: Schema.Types.ObjectId,
                  required: true,
                  refPath: 'scores.modelType',
                },
                value: { type: Number, default: null },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    isActive: {type: Boolean, default: false},
    isDelete: {type: Boolean, default: false}
  },
  { timestamps: true },
);

export const ClassroomModel = MongooseModule.forFeature([
  { name: 'Classroom', schema: ClassroomSchema },
]);

import { Course } from "./Course";
import { User } from "./User";

// export interface Response{
//     data: Classroom[] | Course[] | ,
//     statusCode: number,
//     messages: string
// }

export interface ClassroomsResponse {
  data: Classroom[];
  statusCode: number;
  messages: string;
}
export interface ClassroomResponse {
  data: Classroom;
  statusCode: number;
  messages: string;
}

export interface Classroom {
  code: number;
  instructor: User;
  _id: string;
  title: string;
  learners: User[];
  hours: number;
  courseid: string;
  course: Course;
  dateEnd: string;
  dateStart: string;
  createBy: [];
  dayOfWeek: string;
  room: Room;
  isActive: boolean;
  isDelete: boolean;
  attendances: { _id: string; date: Date; learners: { _id: string }[] }[];
  createdAt?: Date;
}
export interface ClassroomPostResponse {
  data: ClassroomPost;
  statusCode: number;
  messages: string;
}

export interface ClassroomPost {
  code: string;
  instructor: string;
  title: string;
  learners:string[];
  hours: number;
  course: string;
  dateEnd: string;
  dateStart: string;
  dayOfWeek: string;
  room: string;
}

export interface Attendances {
  _id: string;
  date: string;
  learner: string;
}

export interface Score {
  // _id?: string;
  modelType: string;
  value: number;
  score: string;
}

export interface MarksResponse {
  statusCode: number;
  messages: string;
  data: Marks[];
}
export interface Marks {
  _id: string;
  learner: string;
  scores: Score[];
}

export interface RoomsResponse {
  data: Room[];
  statusCode: number;
  messages: string;
}

export interface Room {
  some(
    arg0: (checkRoom: { room: { _id: string } }) => boolean
  ): boolean | undefined;
  some(arg0: (checkRoom: { room: { _id: string } }) => boolean): unknown;
  _id: string;
  title: string;
}


export interface CheckRoomResponse {
  data: string[];
  statusCode: number;
  messages: string;
}

export interface CheckRoom {
  hours: number;
  dayOfWeek: string;
  dateStart: string;
  dateEnd: string;
}

import { Assignment } from "./Assignment";
import { Curriculum } from "./Curiculum";
import { Lab } from "./Lab";
import { Lesson } from "./Lesson";

export interface CoursesResponse{
  data:Course[],
  statusCode:number,
  messages:string,
}
export interface CourseResponse{
  data:Course,
  statusCode:number,
  messages:string,
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  curriculums: Curriculum[];
  lessons: Lesson[];
  labs: Lab[];
  assignments: Assignment[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDelete: boolean;
}

export interface CourseUpdateRequest {
  title: string;
  description: string;
  thumbnail?: string;
  curriculums?: string[];
  isActive?: boolean;
}

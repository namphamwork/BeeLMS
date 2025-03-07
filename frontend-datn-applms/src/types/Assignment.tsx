import { User } from "./User";

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  weight:number;
}

export interface AssignmentUpdateRequest {
  title: string;
  description: string;
}
export interface resultAssignment{
  classroom: string;
  course: string;
  assignment: string;
  originalname: string;
  filename: string;
  size: number;
  type: string;
}

export interface assignmentResult{
  classroom: string;
  course: string;
  assignment: string;
}

export interface getResultAssignment {
  classroom: string;
  course: string;
  createdAt: string;
  filename: string;
  lab: string;
  learner?: User;
  originalname: string;
  size:number;
  type: string;
  updatedAt: string;
}
export interface getResultResponse{
  data: getResultAssignment[];
  messages:string;
  statusCode:number;
}
export interface getAssignmentResponse{
  data: Assignment;
  messages:string;
  statusCode:number;
}
export interface addResultAssignmentRespone{
  messages:string;
  statusCode:number;
}
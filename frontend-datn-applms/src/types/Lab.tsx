import { User } from "./User";
export interface Lab {
  _id: string;
  title: string;
  description: string;
  weight:number;
}

export interface LabUpdateRequest {
  title: string;
  description: string;
}

export interface resultLab{
  classroom: string;
  course: string;
  lab: string;
  originalname: string;
  filename: string;
  size: number;
  type: string;
}
export interface labResult{
  classroom: string;
  course: string;
  lab: string;
}
export interface getResultLab {
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
  data: getResultLab[];
  messages:string;
  statusCode:number;
}
export interface getLabResponse{
  data: Lab;
  messages:string;
  statusCode:number;
}
export interface addResultLabRespone{
  messages:string;
  statusCode:number;
}
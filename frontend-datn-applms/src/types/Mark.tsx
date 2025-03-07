import { Assignment } from "./Assignment";
import { Marks } from "./Classroom";
import { Lab } from "./Lab";
import { Quiz } from "./Lesson";

export interface TableMarkResponse {
  statusCode: number;
  message: string;
  data: TableMark[];
}

export interface TableMark {
  _id?: string;
  labs?: Lab[];
  quizs?: Quiz[];
  assignments?: Assignment[];
}


export interface GetMarksResponse{
  data: Marks[],
  statusCode: number;
  messages: string;
}

export interface UpdateMarksResponse{
  statusCode: number;
  messages: string;
}

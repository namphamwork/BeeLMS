import { Video } from "./Video";

export interface LessonResponse{
  data:Lesson,
  statusCode:number,
  messages:string,
}
export interface LessonsResponse{
  data:Lesson[],
  statusCode:number,
  messages:string,
}


export interface QuizResponse{
  data:Quiz,
  statusCode:number,
  messages:string,
}

export interface QuizsResponse{
  data:Quiz[],
  statusCode:number,
  messages:string,
}

export interface QuestionResponse{
  data:Question,
  statusCode:number,
  messages:string,
}
export interface QuestionsResponse{
  data:Question[],
  statusCode:number,
  messages:string,
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videos: Video[];
  quizs: Quiz[];
}
export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[]
  weight:number;
}
export interface Question {
  _id:string;
  question: string;
  answers: string[];
  correctAnswer: string[];
}

export interface LessonUpdateRequest{
  title: string;
  description: string;
  videos: Video[];
}
  
export interface QuizUpdateRequest{
  title: string;
  description: string;
  questions: Question[];
}

export interface QuizResultResponse{
  data:QuizResultRequest[],
  statusCode:number,
  messages:string,
}
export interface QuizResultRequest {
  classroom: string,
  course: string,
  quiz: string,
  answerQuestions: AnswerQuestion[];
  score: number
}

export interface AnswerQuestion {
  question: string,
  answer:string[]
}
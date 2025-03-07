export interface Curriculum {
  _id: string;
  originalname: string;
  filename: string;
  size: number;
  type: string;
}
export interface CurriculumPost{
  originalname: string;
  filename: string;
  size: number;
  type: string;
}

export interface CurriculumPostResponse{
  data:Curriculum,
  messages:string,
  statusCode:number
}
export interface CurriculumData {
  originalname: string;
  filename: string;
  size: number;
  type: string;
}

export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface FileUploadsResponse {
  data:FileUpload[],
  messages:string,
  statusCode:number
}
export interface FileUploadResponse {
  data: FileUpload,
  messages:string,
  statusCode:number
}


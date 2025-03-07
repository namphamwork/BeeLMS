export interface Video {
  _id: string
  title: string
  description: string
  urlVideo: string
  duration: string
}
export interface VideoCheck {
  data: string[];       
  statusCode: number;   
  messages: string;  
}
export interface CheckVideo {
  course : string
}
export interface resultVideo {
  course : string
  video: string
}
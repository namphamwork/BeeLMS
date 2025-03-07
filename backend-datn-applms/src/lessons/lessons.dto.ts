import { ApiProperty } from '@nestjs/swagger';
import { CreateQuizDto } from 'src/quizs/quizs.dto';

export class CreateLessonDto {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  videos?: {
    title: string;
    description: string[];
    urlVideo: string[];
  }[];

  @ApiProperty()
  quizs?: CreateQuizDto[]
}
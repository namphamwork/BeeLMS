import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { LessonModel } from './lesson.model';
import { QuizsModule } from 'src/quizs/quizs.module';
import { QuizModel } from 'src/quizs/quiz.model';
import { QuizsService } from 'src/quizs/quizs.service';

@Module({
  imports: [LessonModel],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}

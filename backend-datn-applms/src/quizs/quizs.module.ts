import { Module } from '@nestjs/common';
import { QuizsController } from './quizs.controller';
import { QuizsService } from './quizs.service';
import { QuizModel } from './quiz.model';

@Module({
  imports: [QuizModel],
  controllers: [QuizsController],
  providers: [QuizsService],
})
export class QuizsModule {}

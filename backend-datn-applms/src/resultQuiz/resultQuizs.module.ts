import { Module } from '@nestjs/common';
import { ResultQuizsController } from './resultQuizs.controller';
import { ResultQuizsService } from './resultQuizs.service';
import { ResultQuizModel } from './resultQuiz.model';
import { JwtService } from '@nestjs/jwt';
import { ClassroomModel } from 'src/classrooms/classroom.model';

@Module({
  imports: [ResultQuizModel, ClassroomModel],
  controllers: [ResultQuizsController],
  providers: [ResultQuizsService, JwtService],
})
export class ResultQuizsModule {}

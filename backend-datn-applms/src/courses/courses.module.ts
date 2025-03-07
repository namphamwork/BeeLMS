import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseModel } from './course.model';
import { LessonsModule } from 'src/lessons/lessons.module';
import { LessonsService } from 'src/lessons/lessons.service';
import { LessonModel } from 'src/lessons/lesson.model';
import { LabsModule } from 'src/labs/labs.module';
import { LabModel } from 'src/labs/lab.model';
import { LabsService } from 'src/labs/labs.service';
import { CurriculumsModule } from 'src/curriculums/curriculums.module';
import { CurriculumModel } from 'src/curriculums/curriculum.model';
import { CurriculumsService } from 'src/curriculums/curriculums.service';
import { QuizsModule } from 'src/quizs/quizs.module';
import { QuizModel } from 'src/quizs/quiz.model';
import { QuizsService } from 'src/quizs/quizs.service';
import { JwtService } from '@nestjs/jwt';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { AssignmentModel } from 'src/assignments/assignment.model';
import { AssignmentsService } from 'src/assignments/assignments.service';

@Module({
  imports: [CourseModel, LessonsModule, LessonModel, LabsModule, LabModel, AssignmentsModule, AssignmentModel, CurriculumsModule, CurriculumModel, QuizsModule, QuizModel],
  controllers: [CoursesController],
  providers: [CoursesService, LessonsService, LabsService, AssignmentsService, CurriculumsService, QuizsService, JwtService],
})
export class CoursesModule { }

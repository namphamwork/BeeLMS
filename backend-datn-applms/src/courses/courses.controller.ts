import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonsService } from 'src/lessons/lessons.service';
import { LabsService } from 'src/labs/labs.service';
import { CurriculumsService } from 'src/curriculums/curriculums.service';
import { QuizsService } from 'src/quizs/quizs.service';
import { CreateCourseDto } from './courses.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesInterceptor } from 'src/guard/roles.interceptor';
import { Roles } from 'src/guard/roles.decorator';
import { RoleUser, weight } from 'src/config/constants';
import { AssignmentsService } from 'src/assignments/assignments.service';

@Controller('api/v1/courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lessonsService: LessonsService,
    private readonly curriculumsService: CurriculumsService,
    private readonly labsService: LabsService,
    private readonly assignmentsService: AssignmentsService,
    private readonly quizsService: QuizsService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all courses', operationId: 'getAllCourses' })
  async getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID', operationId: 'getCourseById' })
  async getCourseById(@Param('id') id: string): Promise<Course> {
    return this.coursesService.getCourseById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  @ApiOperation({ summary: 'Create a new course', operationId: 'createCourse' })
  async createCourse(@Req() req: any, @Body() course: CreateCourseDto): Promise<any> { 
    let countQuiz = 0;
    
    course.lessons.forEach(lesson => {
      if(lesson.quizs){
        countQuiz += lesson.quizs.length
      }
    });
    const weightQuiz = weight.quizs/countQuiz;

    const createLessonPromises = course.lessons.map(async lesson => {
      if (lesson.quizs) {
        const createQuizPromises = lesson.quizs.map(async quiz => {
          quiz.weight = weightQuiz
          const createdquiz = await this.quizsService.createQuiz(quiz)
          return { "_id": String(createdquiz.data._id) }
        })
        lesson.quizs = await Promise.all(createQuizPromises);
      }
      const createdlesson = await this.lessonsService.createLesson(lesson)
      return { "_id": String(createdlesson.data._id) };
    });
    course.lessons = await Promise.all(createLessonPromises);

    const weightLab = weight.labs/course.labs.length;
    const createLabPromises = course.labs.map(async lab => {
      lab.weight = weightLab
      const createdlab = await this.labsService.createLab(lab)
      return { "_id": String(createdlab.data._id) };
    });
    course.labs = await Promise.all(createLabPromises);

    const weightAssignment = weight.assignments/course.assignments.length;
    const createAssignmentPromises = course.assignments.map(async assignment => {
      assignment.weight = weightAssignment
      const createdassignment = await this.assignmentsService.createAssignment(assignment)
      return { "_id": String(createdassignment.data._id) };
    });
    course.assignments = await Promise.all(createAssignmentPromises);

    const createCurriculumPromises = course.curriculums.map(async curriculum => {
      const createdcurriculum = await this.curriculumsService.createCurriculum(curriculum)
      return { "_id": String(createdcurriculum.data._id) };
    });
    course.curriculums = await Promise.all(createCurriculumPromises);
    return this.coursesService.createCourse(req.user_data, course);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update course by ID', operationId: 'updateCourse' })
  async updateCourse(
    @Param('id') id: string,
    @Body() course: Course,
  ): Promise<Course> {
    return this.coursesService.updateCourse(id, course);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course by ID', operationId: 'deleteCourse' })
  async deleteCourse(@Param('id') id: string): Promise<void> {
    return this.coursesService.deleteCourse(id);
  }
}

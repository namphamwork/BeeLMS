import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { Lesson } from './lesson.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLessonDto } from './lessons.dto';

@Controller('api/v1/lessons')
@ApiTags('Lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all lessons', operationId: 'getAllLessons' })
  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonsService.getAllLessons();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by ID', operationId: 'getLessonById' })
  async getLessonById(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.getLessonById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lesson', operationId: 'createLesson' })
  async createLesson(@Body() lesson: CreateLessonDto): Promise<Lesson> {    
    return this.lessonsService.createLesson(lesson);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update lesson by ID', operationId: 'updateLesson' })
  async updateLesson(@Param('id') id: string, @Body() lesson: Lesson): Promise<Lesson> {
    return this.lessonsService.updateLesson(id, lesson);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lesson by ID', operationId: 'deleteLesson' })
  async deleteLesson(@Param('id') id: string): Promise<void> {
    return this.lessonsService.deleteLesson(id);
  }
}

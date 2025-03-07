import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { Quiz } from './quiz.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQuizDto } from './quizs.dto';

@Controller('api/v1/quizs')
@ApiTags('Quizs')
export class QuizsController {
  constructor(private readonly quizsService: QuizsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quizs', operationId: 'getAllQuizs' })
  async getAllQuizs(): Promise<Quiz[]> {
    return this.quizsService.getAllQuizs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by ID', operationId: 'getQuizById' })
  async getQuizById(@Param('id') id: string): Promise<Quiz> {
    return this.quizsService.getQuizById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new quiz', operationId: 'createQuiz' })
  async createQuiz(@Body() quiz: CreateQuizDto): Promise<Quiz> {
    return this.quizsService.createQuiz(quiz);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update quiz by ID', operationId: 'updateQuiz' })
  async updateQuiz(@Param('id') id: string, @Body() quiz: Quiz): Promise<Quiz> {
    return this.quizsService.updateQuiz(id, quiz);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz by ID', operationId: 'deleteQuiz' })
  async deleteQuiz(@Param('id') id: string): Promise<void> {
    return this.quizsService.deleteQuiz(id);
  }
}

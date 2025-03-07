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
import { ResultQuizsService } from './resultQuizs.service';
import { ResultQuiz } from './resultQuiz.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateResultQuizDto, SaveResultQuizDto } from './resultQuizs.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesInterceptor } from 'src/guard/roles.interceptor';
import { Roles } from 'src/guard/roles.decorator';
import { RoleUser } from 'src/config/constants';

@Controller('api/v1/result-quizs')
@ApiTags('ResultQuizs')
export class ResultQuizsController {
  constructor(private readonly resultQuizsService: ResultQuizsService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all resultQuizs', operationId: 'getAllResultQuizs' })
  // async getAllResultQuizs(): Promise<ResultQuiz[]> {
  //   return this.resultQuizsService.getAllResultQuizs();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get resultQuiz by ID', operationId: 'getResultQuizById' })
  // async getResultQuizById(@Param('id') id: string): Promise<ResultQuiz> {
  //   return this.resultQuizsService.getResultQuizById(id);
  // }

  // @Post()
  // @UseGuards(AuthGuard)
  // @UseInterceptors(RolesInterceptor)
  // @Roles(RoleUser.LEARNER)
  // @ApiOperation({ summary: 'Create a new resultQuiz', operationId: 'createResultQuiz' })
  // async createResultQuiz(@Body() resultQuiz: CreateResultQuizDto): Promise<ResultQuiz> {
  //   return this.resultQuizsService.createResultQuiz(resultQuiz);
  // }

  @Post('save')
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.LEARNER)
  @ApiOperation({ summary: 'Save a new resultQuiz', operationId: 'saveResultQuiz' })
  async saveResultQuiz(@Req() req: any,@Body() resultQuiz: SaveResultQuizDto): Promise<ResultQuiz> {
    return this.resultQuizsService.saveResultQuiz(req.user_data,resultQuiz);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update resultQuiz by ID', operationId: 'updateResultQuiz' })
  // async updateResultQuiz(@Param('id') id: string, @Body() resultQuiz: ResultQuiz): Promise<ResultQuiz> {
  //   return this.resultQuizsService.updateResultQuiz(id, resultQuiz);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete resultQuiz by ID', operationId: 'deleteResultQuiz' })
  // async deleteResultQuiz(@Param('id') id: string): Promise<void> {
  //   return this.resultQuizsService.deleteResultQuiz(id);
  // }
}

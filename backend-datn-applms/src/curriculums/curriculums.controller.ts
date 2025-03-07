import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CurriculumsService } from './curriculums.service';
import { Curriculum } from './curriculum.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCurriculumDto } from './curriculums.dto';

@Controller('api/v1/curriculums')
@ApiTags('Curriculums')
export class CurriculumsController {
  constructor(private readonly curriculumsService: CurriculumsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all curriculums',
    operationId: 'getAllCurriculums',
  })
  async getAllCurriculums(): Promise<Curriculum[]> {
    return this.curriculumsService.getAllCurriculums();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get curriculum by ID',
    operationId: 'getCurriculumById',
  })
  async getCurriculumById(@Param('id') id: string): Promise<Curriculum> {
    return this.curriculumsService.getCurriculumById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new curriculum',
    operationId: 'createCurriculum',
  })
  async createCurriculum(@Body() curriculum: CreateCurriculumDto): Promise<Curriculum> {
    return this.curriculumsService.createCurriculum(curriculum);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update curriculum by ID',
    operationId: 'updateCurriculum',
  })
  async updateCurriculum(
    @Param('id') id: string,
    @Body() curriculum: Curriculum,
  ): Promise<Curriculum> {
    return this.curriculumsService.updateCurriculum(id, curriculum);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete curriculum by ID',
    operationId: 'deleteCurriculum',
  })
  async deleteCurriculum(@Param('id') id: string): Promise<void> {
    return this.curriculumsService.deleteCurriculum(id);
  }
}

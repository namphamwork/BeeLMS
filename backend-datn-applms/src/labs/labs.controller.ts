import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LabsService } from './labs.service';
import { Lab } from './lab.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLabDto } from './labs.dto';

@Controller('api/v1/labs')
@ApiTags('Labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all labs', operationId: 'getAllLabs' })
  async getAllLabs(): Promise<Lab[]> {
    return this.labsService.getAllLabs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lab by ID', operationId: 'getLabById' })
  async getLabById(@Param('id') id: string): Promise<Lab> {
    return this.labsService.getLabById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lab', operationId: 'createLab' })
  async createLab(@Body() lab: CreateLabDto): Promise<Lab> {
    return this.labsService.createLab(lab);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update lab by ID', operationId: 'updateLab' })
  async updateLab(@Param('id') id: string, @Body() lab: Lab): Promise<Lab> {
    return this.labsService.updateLab(id, lab);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lab by ID', operationId: 'deleteLab' })
  async deleteLab(@Param('id') id: string): Promise<void> {
    return this.labsService.deleteLab(id);
  }
}

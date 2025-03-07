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
import { ResultAssignmentsService } from './resultAssignments.service';
import { ResultAssignment } from './resultAssignment.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckResultAssignmentDto, SaveResultAssignmentDto } from './resultAssignments.dto';
import { RoleUser } from 'src/config/constants';
import { Roles } from 'src/guard/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesInterceptor } from 'src/guard/roles.interceptor';

@Controller('api/v1/result-assignments')
@ApiTags('ResultAssignments')
export class ResultAssignmentsController {
  constructor(private readonly resultAssignmentsService: ResultAssignmentsService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all resultAssignments', operationId: 'getAllResultAssignments' })
  // async getAllResultAssignments(): Promise<ResultAssignment[]> {
  //   return this.resultAssignmentsService.getAllResultAssignments();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get resultAssignment by ID', operationId: 'getResultAssignmentById' })
  // async getResultAssignmentById(@Param('id') id: string): Promise<ResultAssignment> {
  //   return this.resultAssignmentsService.getResultAssignmentById(id);
  // }

  // @Post()
  // @ApiOperation({ summary: 'Create a new resultAssignment', operationId: 'createResultAssignment' })
  // async createResultAssignment(@Body() resultAssignment: ResultAssignment): Promise<ResultAssignment> {
  //   return this.resultAssignmentsService.createResultAssignment(resultAssignment);
  // }

  @Post('/save')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Save resultAssignment', operationId: 'saveResultAssignment' })
  async saveResultAssignment(@Req() req: any,@Body() resultAssignment: SaveResultAssignmentDto): Promise<ResultAssignment> {
    return this.resultAssignmentsService.saveResultAssignment(req.user_data,resultAssignment);
  }

  @Post('/check')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Check resultAssignment', operationId: 'checkResultAssignment' })
  async checkResultAssignment(@Req() req: any,@Body() resultAssignment: CheckResultAssignmentDto): Promise<ResultAssignment> {
    return this.resultAssignmentsService.checkResultAssignment(req.user_data,resultAssignment);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update resultAssignment by ID', operationId: 'updateResultAssignment' })
  // async updateResultAssignment(@Param('id') id: string, @Body() resultAssignment: ResultAssignment): Promise<ResultAssignment> {
  //   return this.resultAssignmentsService.updateResultAssignment(id, resultAssignment);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete resultAssignment by ID', operationId: 'deleteResultAssignment' })
  // async deleteResultAssignment(@Param('id') id: string): Promise<void> {
  //   return this.resultAssignmentsService.deleteResultAssignment(id);
  // }
}

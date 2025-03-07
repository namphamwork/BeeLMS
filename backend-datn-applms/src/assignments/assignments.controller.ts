import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './assignment.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAssignmentDto } from './assignments.dto';

@Controller('api/v1/assignments')
@ApiTags('Assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all assignments', operationId: 'getAllAssignments' })
  async getAllAssignments(): Promise<Assignment[]> {
    return this.assignmentsService.getAllAssignments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment by ID', operationId: 'getAssignmentById' })
  async getAssignmentById(@Param('id') id: string): Promise<Assignment> {
    return this.assignmentsService.getAssignmentById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new assignment', operationId: 'createAssignment' })
  async createAssignment(@Body() assignment: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentsService.createAssignment(assignment);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update assignment by ID', operationId: 'updateAssignment' })
  async updateAssignment(@Param('id') id: string, @Body() assignment: Assignment): Promise<Assignment> {
    return this.assignmentsService.updateAssignment(id, assignment);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete assignment by ID', operationId: 'deleteAssignment' })
  async deleteAssignment(@Param('id') id: string): Promise<void> {
    return this.assignmentsService.deleteAssignment(id);
  }
}

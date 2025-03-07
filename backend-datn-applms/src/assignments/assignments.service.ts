import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from './assignment.model';
import { createResponse } from '../util/util';
import { CreateAssignmentDto } from './assignments.dto';

@Injectable()
export class AssignmentsService {
  constructor(@InjectModel('Assignment') private readonly assignmentModel: Model<Assignment>) {}

  async getAllAssignments(): Promise<any> {
    try {
      const assignments = await this.assignmentModel.find().exec();
      return createResponse(200, 'Success', assignments);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getAssignmentById(id: string): Promise<any> {
    try {
      const assignment = await this.assignmentModel.findById(id).exec();
      if (assignment) {
        return createResponse(200, 'Success', assignment);
      } else {
        return createResponse(404, 'Assignment not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createAssignment(assignment: CreateAssignmentDto): Promise<any> {
    try {
      const createdAssignment = new this.assignmentModel(assignment);
      await createdAssignment.save();
      return createResponse(201, 'Assignment created', createdAssignment);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateAssignment(id: string, assignment: Assignment): Promise<any> {
    try {
      const updatedAssignment = await this.assignmentModel
        .findByIdAndUpdate(id, assignment, { new: true })
        .exec();
      if (updatedAssignment) {
        return createResponse(200, 'Assignment updated', updatedAssignment);
      } else {
        return createResponse(404, 'Assignment not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteAssignment(id: string): Promise<any> {
    try {
      const deletedAssignment = await this.assignmentModel.findByIdAndDelete(id).exec();
      if (deletedAssignment) {
        return createResponse(200, 'Assignment deleted', deletedAssignment);
      } else {
        return createResponse(404, 'Assignment not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

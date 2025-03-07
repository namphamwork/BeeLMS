import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultAssignment } from './resultAssignment.model';
import { createResponse } from '../util/util';
import { CheckResultAssignmentDto, SaveResultAssignmentDto } from './resultAssignments.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class ResultAssignmentsService {
  constructor(@InjectModel('ResultAssignment') private readonly resultAssignmentModel: Model<ResultAssignment>) { }

  // async getAllResultAssignments(): Promise<any> {
  //   try {
  //     const resultAssignments = await this.resultAssignmentModel.find().exec();
  //     return createResponse(200, 'Success', resultAssignments);
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async getResultAssignmentById(id: string): Promise<any> {
  //   try {
  //     const resultAssignment = await this.resultAssignmentModel.findById(id).exec();
  //     if (resultAssignment) {
  //       return createResponse(200, 'Success', resultAssignment);
  //     } else {
  //       return createResponse(404, 'ResultAssignment not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async createResultAssignment(resultAssignment: ResultAssignment): Promise<any> {
  //   try {
  //     const createdResultAssignment = new this.resultAssignmentModel(resultAssignment);
  //     await createdResultAssignment.save();
  //     return createResponse(201, 'ResultAssignment created', createdResultAssignment);
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  async saveResultAssignment(user: User, resultAssignment: SaveResultAssignmentDto): Promise<any> {
    resultAssignment.learner = user.id;

    try {
      const createdResultAssignment = new this.resultAssignmentModel(resultAssignment);
      await createdResultAssignment.save();
      return createResponse(201, 'ResultAssignment saved', createdResultAssignment);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
  async checkResultAssignment(user: User, resultAssignment: CheckResultAssignmentDto): Promise<any> {
    const { id, role } = user;
    resultAssignment.learner = id;
    
    try {
      if(role == 'learner'){
        const resultAssignments = await this.resultAssignmentModel.find({
          classroom: resultAssignment.classroom,
          learner: resultAssignment.learner,
          course: resultAssignment.course,
          assignment: resultAssignment.assignment,
        }).populate({path:'learner',select:'code username fullname'}).exec();
        return createResponse(200, 'Success', resultAssignments);
      }else{
        const resultAssignments = await this.resultAssignmentModel.find({
          classroom: resultAssignment.classroom,
          course: resultAssignment.course,
          assignment: resultAssignment.assignment,
        }).populate({path:'learner',select:'code username fullname'}).exec();

        const learnerMap = new Map();
        const uniqueResultAssignments = [];
        for (let i = resultAssignments.length - 1; i >= 0; i--) {
          const assignment = resultAssignments[i];
          const learnerKey = assignment.learner._id.toString();
          if (!learnerMap.has(learnerKey)) {
            uniqueResultAssignments.unshift(assignment);
            learnerMap.set(learnerKey, true);
          }
        }
        return createResponse(200, 'Success', uniqueResultAssignments);
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  // async updateResultAssignment(id: string, resultAssignment: ResultAssignment): Promise<any> {
  //   try {
  //     const updatedResultAssignment = await this.resultAssignmentModel
  //       .findByIdAndUpdate(id, resultAssignment, { new: true })
  //       .exec();
  //     if (updatedResultAssignment) {
  //       return createResponse(200, 'ResultAssignment updated', updatedResultAssignment);
  //     } else {
  //       return createResponse(404, 'ResultAssignment not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async deleteResultAssignment(id: string): Promise<any> {
  //   try {
  //     const deletedResultAssignment = await this.resultAssignmentModel.findByIdAndDelete(id).exec();
  //     if (deletedResultAssignment) {
  //       return createResponse(200, 'ResultAssignment deleted', deletedResultAssignment);
  //     } else {
  //       return createResponse(404, 'ResultAssignment not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultLab } from './resultLab.model';
import { createResponse } from '../util/util';
import { CheckResultLabDto, SaveResultLabDto } from './resultLabs.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class ResultLabsService {
  constructor(@InjectModel('ResultLab') private readonly resultLabModel: Model<ResultLab>) { }

  // async getAllResultLabs(): Promise<any> {
  //   try {
  //     const resultLabs = await this.resultLabModel.find().exec();
  //     return createResponse(200, 'Success', resultLabs);
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async getResultLabById(id: string): Promise<any> {
  //   try {
  //     const resultLab = await this.resultLabModel.findById(id).exec();
  //     if (resultLab) {
  //       return createResponse(200, 'Success', resultLab);
  //     } else {
  //       return createResponse(404, 'ResultLab not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async createResultLab(resultLab: ResultLab): Promise<any> {
  //   try {
  //     const createdResultLab = new this.resultLabModel(resultLab);
  //     await createdResultLab.save();
  //     return createResponse(201, 'ResultLab created', createdResultLab);
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  async saveResultLab(user: User, resultLab: SaveResultLabDto): Promise<any> {
    resultLab.learner = user.id;

    try {
      const createdResultLab = new this.resultLabModel(resultLab);
      await createdResultLab.save();
      return createResponse(201, 'ResultLab saved', createdResultLab);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async checkResultLab(user: User, resultLab: CheckResultLabDto): Promise<any> {
    const { id, role } = user;
    resultLab.learner = id;
    
    try {
      if(role == 'learner'){
        const resultLabs = await this.resultLabModel.find({
          classroom: resultLab.classroom,
          learner: resultLab.learner,
          course: resultLab.course,
          lab: resultLab.lab,
        }).populate({path:'learner',select:'code username fullname'}).exec();
        return createResponse(200, 'Success', resultLabs);
      }else{
        const resultLabs = await this.resultLabModel.find({
          classroom: resultLab.classroom,
          course: resultLab.course,
          lab: resultLab.lab,
        }).populate({path:'learner',select:'code username fullname'}).exec();

        const learnerMap = new Map();
        const uniqueResultLabs = [];
        for (let i = resultLabs.length - 1; i >= 0; i--) {
          const lab = resultLabs[i];
          const learnerKey = lab.learner._id.toString();
          if (!learnerMap.has(learnerKey)) {
            uniqueResultLabs.unshift(lab);
            learnerMap.set(learnerKey, true);
          }
        }
        return createResponse(200, 'Success', uniqueResultLabs);
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  // async updateResultLab(id: string, resultLab: ResultLab): Promise<any> {
  //   try {
  //     const updatedResultLab = await this.resultLabModel
  //       .findByIdAndUpdate(id, resultLab, { new: true })
  //       .exec();
  //     if (updatedResultLab) {
  //       return createResponse(200, 'ResultLab updated', updatedResultLab);
  //     } else {
  //       return createResponse(404, 'ResultLab not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async deleteResultLab(id: string): Promise<any> {
  //   try {
  //     const deletedResultLab = await this.resultLabModel.findByIdAndDelete(id).exec();
  //     if (deletedResultLab) {
  //       return createResponse(200, 'ResultLab deleted', deletedResultLab);
  //     } else {
  //       return createResponse(404, 'ResultLab not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }
}

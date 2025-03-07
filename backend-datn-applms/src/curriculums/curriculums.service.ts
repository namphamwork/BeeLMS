import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Curriculum } from './curriculum.model';
import { createResponse } from '../util/util';
import { CreateCurriculumDto } from './curriculums.dto';

@Injectable()
export class CurriculumsService {
  constructor(
    @InjectModel('Curriculum')
    private readonly curriculumModel: Model<Curriculum>,
  ) {}

  async getAllCurriculums(): Promise<any> {
    try {
      const curriculums = await this.curriculumModel.find().exec();
      return createResponse(200, 'Success', curriculums);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getCurriculumById(id: string): Promise<any> {
    try {
      const curriculum = await this.curriculumModel.findById(id).exec();
      if (curriculum) {
        return createResponse(200, 'Success', curriculum);
      } else {
        return createResponse(404, 'Curriculum not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createCurriculum(curriculum: CreateCurriculumDto): Promise<any> {
    try {
      const createdCurriculum = new this.curriculumModel(curriculum);
      await createdCurriculum.save();
      return createResponse(201, 'Curriculum created', createdCurriculum);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateCurriculum(id: string, curriculum: Curriculum): Promise<any> {
    try {
      const updatedCurriculum = await this.curriculumModel
        .findByIdAndUpdate(id, curriculum, { new: true })
        .exec();
      if (updatedCurriculum) {
        return createResponse(200, 'Curriculum updated', updatedCurriculum);
      } else {
        return createResponse(404, 'Curriculum not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteCurriculum(id: string): Promise<any> {
    try {
      const deletedCurriculum = await this.curriculumModel
        .findByIdAndDelete(id)
        .exec();
      if (deletedCurriculum) {
        return createResponse(200, 'Curriculum deleted', deletedCurriculum);
      } else {
        return createResponse(404, 'Curriculum not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

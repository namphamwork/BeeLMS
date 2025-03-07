import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lab } from './lab.model';
import { createResponse } from '../util/util';
import { CreateLabDto } from './labs.dto';

@Injectable()
export class LabsService {
  constructor(@InjectModel('Lab') private readonly labModel: Model<Lab>) {}

  async getAllLabs(): Promise<any> {
    try {
      const labs = await this.labModel.find().exec();
      return createResponse(200, 'Success', labs);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getLabById(id: string): Promise<any> {
    try {
      const lab = await this.labModel.findById(id).exec();
      if (lab) {
        return createResponse(200, 'Success', lab);
      } else {
        return createResponse(404, 'Lab not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createLab(lab: CreateLabDto): Promise<any> {
    try {
      const createdLab = new this.labModel(lab);
      await createdLab.save();
      return createResponse(201, 'Lab created', createdLab);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateLab(id: string, lab: Lab): Promise<any> {
    try {
      const updatedLab = await this.labModel
        .findByIdAndUpdate(id, lab, { new: true })
        .exec();
      if (updatedLab) {
        return createResponse(200, 'Lab updated', updatedLab);
      } else {
        return createResponse(404, 'Lab not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteLab(id: string): Promise<any> {
    try {
      const deletedLab = await this.labModel.findByIdAndDelete(id).exec();
      if (deletedLab) {
        return createResponse(200, 'Lab deleted', deletedLab);
      } else {
        return createResponse(404, 'Lab not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classroom } from 'src/classrooms/classroom.model';
import { User } from 'src/users/user.model';
import { createResponse } from '../util/util';
import { ResultQuiz } from './resultQuiz.model';
import { CreateResultQuizDto, SaveResultQuizDto } from './resultQuizs.dto';

@Injectable()
export class ResultQuizsService {
  constructor(
    @InjectModel('ResultQuiz') private readonly resultQuizModel: Model<ResultQuiz>,
    @InjectModel('Classroom') private readonly classroomModel: Model<Classroom>,
  ) { }

  async getAllResultQuizs(): Promise<any> {
    try {
      const resultQuizs = await this.resultQuizModel.find().exec();
      return createResponse(200, 'Success', resultQuizs);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getResultQuizById(id: string): Promise<any> {
    try {
      const resultQuiz = await this.resultQuizModel.findById(id).exec();
      if (resultQuiz) {
        return createResponse(200, 'Success', resultQuiz);
      } else {
        return createResponse(404, 'ResultQuiz not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createResultQuiz(resultQuiz: CreateResultQuizDto): Promise<any> {
    try {
      const createdResultQuiz = new this.resultQuizModel(resultQuiz);
      await createdResultQuiz.save();
      return createResponse(201, 'ResultQuiz created', createdResultQuiz);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async saveResultQuiz(user: User, resultQuiz: SaveResultQuizDto): Promise<any> {
    resultQuiz.learner = user.id;

    const { classroom, learner, quiz, score } = resultQuiz;
    try {
      const updateScore = {
        modelType: 'Quiz',
        score: quiz,
        value: score
      }
      await this.classroomModel.findOneAndUpdate(
        { '_id': classroom },
        {
          $addToSet: { 'marks.$[elem1].scores': updateScore },
        },
        {
          arrayFilters: [
            { 'elem1.learner': learner, 'elem1.scores.score': { $ne: quiz } },
          ],
          new: true
        }
      ).exec();

      await this.classroomModel.findOneAndUpdate(
        { '_id': classroom },
        {
          $set: { 'marks.$[elem2].scores.$[elem3]': updateScore }
        },
        {
          arrayFilters: [
            { 'elem2.learner': learner },
            { 'elem3.score': quiz }
          ],
          new: true
        }
      ).exec();

      const createdResultQuiz = new this.resultQuizModel(resultQuiz);
      await createdResultQuiz.save();
      
      return createResponse(201, 'ResultQuiz saved', createdResultQuiz);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateResultQuiz(id: string, resultQuiz: ResultQuiz): Promise<any> {
    try {
      const updatedResultQuiz = await this.resultQuizModel
        .findByIdAndUpdate(id, resultQuiz, { new: true })
        .exec();
      if (updatedResultQuiz) {
        return createResponse(200, 'ResultQuiz updated', updatedResultQuiz);
      } else {
        return createResponse(404, 'ResultQuiz not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteResultQuiz(id: string): Promise<any> {
    try {
      const deletedResultQuiz = await this.resultQuizModel.findByIdAndDelete(id).exec();
      if (deletedResultQuiz) {
        return createResponse(200, 'ResultQuiz deleted', deletedResultQuiz);
      } else {
        return createResponse(404, 'ResultQuiz not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

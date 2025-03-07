import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.model';
import { createResponse } from '../util/util';
import { CreateQuizDto } from './quizs.dto';

@Injectable()
export class QuizsService {
  constructor(@InjectModel('Quiz') private readonly quizModel: Model<Quiz>) {}

  async getAllQuizs(): Promise<any> {
    try {
      const quizs = await this.quizModel.find().exec();
      return createResponse(200, 'Success', quizs);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getQuizById(id: string): Promise<any> {
    try {
      const quiz = await this.quizModel.findById(id).exec();
      if (quiz) {
        return createResponse(200, 'Success', quiz);
      } else {
        return createResponse(404, 'Quiz not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createQuiz(quiz: CreateQuizDto): Promise<any> {
    try {
      const createdQuiz = new this.quizModel(quiz);
      await createdQuiz.save();
      return createResponse(201, 'Quiz created', createdQuiz);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateQuiz(id: string, quiz: Quiz): Promise<any> {
    try {
      const updatedQuiz = await this.quizModel
        .findByIdAndUpdate(id, quiz, { new: true })
        .exec();
      if (updatedQuiz) {
        return createResponse(200, 'Quiz updated', updatedQuiz);
      } else {
        return createResponse(404, 'Quiz not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteQuiz(id: string): Promise<any> {
    try {
      const deletedQuiz = await this.quizModel.findByIdAndDelete(id).exec();
      if (deletedQuiz) {
        return createResponse(200, 'Quiz deleted', deletedQuiz);
      } else {
        return createResponse(404, 'Quiz not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

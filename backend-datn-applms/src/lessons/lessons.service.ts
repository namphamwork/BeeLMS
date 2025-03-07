import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from './lesson.model';
import { createResponse } from '../util/util';
import { CreateLessonDto } from './lessons.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<Lesson>,
  ) {}

  async getAllLessons(): Promise<any> {
    try {
      const lessons = await this.lessonModel.find().exec();
      return createResponse(200, 'Success', lessons);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getLessonById(id: string): Promise<any> {
    try {
      const lesson = await this.lessonModel.findById(id).exec();
      if (lesson) {
        return createResponse(200, 'Success', lesson);
      } else {
        return createResponse(404, 'Lesson not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createLesson(lesson: CreateLessonDto): Promise<any> {    
    try {
      const createdLesson = new this.lessonModel(lesson);
      await createdLesson.save();
      return createResponse(201, 'Lesson created', createdLesson);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateLesson(id: string, lesson: Lesson): Promise<any> {
    try {
      const updatedLesson = await this.lessonModel
        .findByIdAndUpdate(id, lesson, { new: true })
        .exec();
      if (updatedLesson) {
        return createResponse(200, 'Lesson updated', updatedLesson);
      } else {
        return createResponse(404, 'Lesson not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteLesson(id: string): Promise<any> {
    try {
      const deletedLesson = await this.lessonModel.findByIdAndDelete(id).exec();
      if (deletedLesson) {
        return createResponse(200, 'Lesson deleted', deletedLesson);
      } else {
        return createResponse(404, 'Lesson not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.model';
import { createResponse } from '../util/util';
import { CreateCourseDto } from './courses.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) { }

  async getAllCourses(): Promise<any> {
    try {
      const courses = await this.courseModel.find()
        .populate({ path: 'lessons labs curriculums createBy', select: '-password' })
        .exec();
      return createResponse(200, 'Success', courses);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getCourseById(id: string): Promise<any> {
    try {
      const course = await this.courseModel.findById(id)
        .populate([
          {
            path: 'lessons',
            select: '',
            populate: [
              { path: 'quizs', select: '' }
            ]
          },
          { path: 'labs curriculums assignments', select: '' }
        ])
        .exec();
      if (course) {
        return createResponse(200, 'Success', course);
      } else {
        return createResponse(404, 'Course not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createCourse(user: User, course: CreateCourseDto): Promise<any> {
    try {
      course.createBy = user.id
      const createdCourse = new this.courseModel(course);
      await createdCourse.save();
      return createResponse(201, 'Course created', createdCourse);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateCourse(id: string, course: Course): Promise<any> {
    try {
      const updatedCourse = await this.courseModel
        .findByIdAndUpdate(id, course, { new: true })
        .exec();
      if (updatedCourse) {
        return createResponse(200, 'Course updated', updatedCourse);
      } else {
        return createResponse(404, 'Course not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteCourse(id: string): Promise<any> {
    try {
      const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
      if (deletedCourse) {
        return createResponse(200, 'Course deleted', deletedCourse);
      } else {
        return createResponse(404, 'Course not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

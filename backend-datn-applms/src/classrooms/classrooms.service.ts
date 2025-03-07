import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classroom } from './classroom.model';
import { createResponse } from '../util/util';
import { User } from 'src/users/user.model';
import { AttendanceDto, CheckBookingDto, CreateClassroomDto, UpdateMarksDto } from './classrooms.dto';
const getDaysOfWeek = (dateStart, dateEnd, dayOfWeek): { date: Date; learners: string[] }[] => {
  const startDate = new Date(dateStart);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(dateEnd);
  endDate.setHours(0, 0, 0, 0);
  const result = [];

  const daysOfWeekArr = dayOfWeek.split('').map(Number);

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  const isDayOfWeek = (date, day) => {
    const dayIndex = date.getDay();
    return daysOfWeekArr.includes(dayIndex === 0 ? 7 : dayIndex + 1);
  };

  for (
    let currentDate = startDate;
    currentDate <= endDate;
    currentDate = addDays(currentDate, 1)
  ) {
    if (
      daysOfWeekArr.some((day) => isDayOfWeek(currentDate, day)) &&
      currentDate.getDay() !== 0
    ) {
      const dateObj = new Date(currentDate);
      dateObj.setHours(0, 0, 0, 0);
      result.push({ date: dateObj, learners: [] });
    }
  }

  return result;
};
@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel('Classroom') private readonly classroomModel: Model<Classroom>,
  ) { }

  async getAllClassrooms(): Promise<any> {
    try {
      const classrooms = await this.classroomModel
        .find()
        .select('-attendances -marks -learners')
        .populate({ path: 'instructor createBy', select: 'fullname username avatar code' })
        .populate({ path: 'course', select: 'title description' })
        .exec();
      return createResponse(200, 'Success', classrooms);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getAllMyClassrooms(user: User): Promise<any> {
    const { id, role } = user;
    
    try {
      let classrooms;
      if (role === 'learner') {
        classrooms = await this.classroomModel
          .find({ learners: id })
          .select('-learners -marks')
          .populate({ path: 'instructor createBy', select: 'fullname username avatar code' })
          .populate({ path: 'course', select: 'title description' })
          .populate({ path: 'room', select: '' })
          .exec();
      } else {
        classrooms = await this.classroomModel
          .find({ instructor: id })
          .select('-learners -marks')
          .populate({ path: 'instructor createBy', select: 'fullname username avatar code' })
          .populate({ path: 'course', select: 'title description' })
          .populate({ path: 'room', select: '' })
          .exec();
      }
      return createResponse(200, 'Success', classrooms);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getClassroomById(id: string): Promise<any> {
    try {
      const classroom = await this.classroomModel
        .findById(id)
        .select("-marks")
        .populate([
          { path: 'instructor createBy learners', select: 'fullname username avatar code' },
          {
            path: 'attendances',
            select: '',
            populate: [
              { path: 'learners', select: '-password -refresh_token -role' }
            ]
          },
          { 
            path: 'course', 
            select: '',
            populate: [
              { path: 'lessons labs curriculums assignments', select: '' }
            ]
          },
          { 
            path: 'room', 
            select: '',
          }
        ])
        .exec();
      if (classroom) {
        return createResponse(200, 'Success', classroom);
      } else {
        return createResponse(404, 'Class not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getTableMarksByIdClass(idClassRoom: string, user: User): Promise<any> {
    const { id, role } = user;
    
    try {
      const classroom = await this.classroomModel
        .findById(idClassRoom)
        .select("learners")
        .populate([
          { path: 'learners', select: 'fullname username avatar code' },
          { 
            path: 'course', 
            select: 'labs lessons assignments',
            populate: [
              { path: 'lessons', select: 'quizs', populate: [
                {path: 'quizs', select: 'title weight'}
              ] },
              { path: 'labs', select: 'title weight' },
              { path: 'assignments', select: 'title weight' }
            ]
          },
        ])
        .exec();
      if (classroom) {
        const listQuizs = []
        classroom.course.lessons.map(l=>{
          listQuizs.push(...l.quizs)
        })
        const tableMarks:any = {
          _id: classroom._id,
          labs: classroom.course.labs,
          assignments: classroom.course.assignments,
          quizs: listQuizs,
        }
        
        if(role != 'learner'){
          tableMarks.learners = classroom.learners;
        }
        
        return createResponse(200, 'Success', tableMarks);
      } else {
        return createResponse(404, 'Class not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getMarksByClassroomId(idClassRoom: string, user: User): Promise<any> {
    const { id, role } = user;  
    try {
      let classroom = await this.classroomModel
        .findById(idClassRoom)
        .select("marks")
        .populate([
          {
            path: 'marks',
            select: '',
          },
        ])
        .exec();
        
      if (classroom) {
        if (role === 'learner') {
          classroom.marks = classroom.marks.filter(mark => mark.learner == id);
        }
  
        return createResponse(200, 'Success', classroom.marks);
      } else {
        return createResponse(404, 'Class not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateMarksByClassroomId(idClassRoom: string, marks: UpdateMarksDto[]): Promise<any> {
      
    try {
      marks.map(async(mark) =>{
        const {learner, scores} = mark;
        await scores.map(async(s) =>{
          const {score} = s;
          
          await this.classroomModel.findOneAndUpdate(
            { '_id': idClassRoom },
            {
              $addToSet: { 'marks.$[elem1].scores': s },
            },
            {
              arrayFilters: [
                { 'elem1.learner': learner, 'elem1.scores.score': { $ne: score } },
              ],
              new: true
            }
          ).exec();
    
          await this.classroomModel.findOneAndUpdate(
            { '_id': idClassRoom },
            {
              $set: { 'marks.$[elem2].scores.$[elem3]': s }
            },
            {
              arrayFilters: [
                { 'elem2.learner': learner },
                { 'elem3.score': score }
              ],
              new: true
            }
          ).exec();
        })
      })
      return createResponse(201, 'Marks saved');
      
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createClassroom(user: User, classroom: CreateClassroomDto): Promise<any> {
    const { dateStart, dateEnd, dayOfWeek, learners } = classroom;
    classroom.createBy = user.id;

    classroom.attendances = getDaysOfWeek(dateStart, dateEnd, dayOfWeek);

    if (learners) {
      const resultArray = [];
      for (const item of classroom.learners) {
        resultArray.push({ learner: item });
      }
      classroom.marks = resultArray;
    }
    try {
      const createdClassroom = new this.classroomModel(classroom);
      await createdClassroom.save();
      return createResponse(201, 'Course created', createdClassroom);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateClassroom(id: string, classroom: Classroom): Promise<any> {
    try {
      const updatedClassroom = await this.classroomModel
        .findByIdAndUpdate(id, classroom, { new: true })
        .exec();
      if (updatedClassroom) {
        return createResponse(200, 'Classroom updated', updatedClassroom);
      } else {
        return createResponse(404, 'Classroom not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateAttendanceByClassroomId(idClassRoom: string, attendance: AttendanceDto): Promise<any> {
    const {id, learners}= attendance;    
    
    try {
      const updatedClassroom = await this.classroomModel
        .findOneAndUpdate(
          { _id: idClassRoom, 'attendances._id': id }, // Tìm kiếm lớp học với _id và mảng attendances với _id tương ứng
          { $set: { 'attendances.$.learners': learners } }, // Cập nhật mảng learners trong attendances
          { new: true }
        )
        .exec();
      if (updatedClassroom) {
        return createResponse(200, 'Classroom updated', updatedClassroom);
      } else {
        return createResponse(404, 'Classroom not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteClassroom(id: string): Promise<any> {
    try {
      const deletedClassroom = await this.classroomModel
        .findByIdAndDelete(id)
        .exec();
      if (deletedClassroom) {
        return createResponse(200, 'Classroom deleted', deletedClassroom);
      } else {
        return createResponse(404, 'Classroom not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async checkBooking(booking: CheckBookingDto): Promise<any> {
    const { hours, dayOfWeek, dateStart, dateEnd } = booking
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    try {
      const classrooms = await this.classroomModel
        .find({
          hours: hours,
          dayOfWeek: dayOfWeek,
          $or: [
            { dateStart: { $gte: startDate, $lte: endDate }},
            { dateEnd: { $gte: startDate, $lte: endDate }},
            {
              dateStart: { $lte: startDate },
              dateEnd: { $gte: endDate }
            }
          ]
        })
        .select('room')
        .populate({ path: 'room', select: '' })
        .exec();
        const bookings = classrooms.map((classroom)=>classroom.room._id)
      return createResponse(200, 'Success', bookings);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

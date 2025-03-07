import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { createResponse } from '../util/util';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/auth.dto';
import { CreateUserDto } from './users.dto';
import { CheckBookingDto } from 'src/classrooms/classrooms.dto';
import { Classroom } from 'src/classrooms/classroom.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Classroom') private readonly classroomModel: Model<Classroom>
  ) { }

  async getAllUsers(): Promise<any> {
    try {
      const users = await this.userModel.find().select('-password -refresh_token').exec();
      return createResponse(200, 'Success', users);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getAllLearners(): Promise<any> {
    try {
      const learners = await this.userModel.find({ role: 'learner' }).select('-password -refresh_token -role').exec();
      return createResponse(200, 'Success', learners);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async leanrsEmptyClass(booking: CheckBookingDto): Promise<any> {
    const { hours, dayOfWeek, dateStart, dateEnd } = booking
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    try {
      const classrooms = await this.classroomModel
        .find({
          hours: hours,
          dayOfWeek: dayOfWeek,
          $or: [
            { dateStart: { $gte: startDate, $lte: endDate } },
            { dateEnd: { $gte: startDate, $lte: endDate } },
            {
              dateStart: { $lte: startDate },
              dateEnd: { $gte: endDate }
            }
          ]
        })
        .select('learners')
        .exec();

      const mergedLearners = [];

      if (classrooms) {
        await classrooms.forEach(obj => {
          obj.learners.forEach(learner => {
            if (!mergedLearners.includes(learner)) {
              mergedLearners.push(learner);
            }
          });
        });
      }

      const users = await this.userModel
        .find({
          role: "learner",
          _id: { $nin: mergedLearners }
        })
        .select("-password -refresh_token -role")
        .exec();

      return createResponse(200, 'Success', users);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async instructorsEmptyClass(booking: CheckBookingDto): Promise<any> {
    const { hours, dayOfWeek, dateStart, dateEnd } = booking
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    try {
      const classrooms = await this.classroomModel
        .find({
          hours: hours,
          dayOfWeek: dayOfWeek,
          $or: [
            { dateStart: { $gte: startDate, $lte: endDate } },
            { dateEnd: { $gte: startDate, $lte: endDate } },
            {
              dateStart: { $lte: startDate },
              dateEnd: { $gte: endDate }
            }
          ]
        })
        .select('instructor')
        .exec();

      const mergedInstructors = [];


      if (classrooms) {
        await classrooms.forEach(obj => {
          const { instructor } = obj;
          if (!mergedInstructors.includes(instructor)) {
            mergedInstructors.push(instructor);
          }
        });

      }

      const users = await this.userModel
        .find({
          role: "instructor",
          _id: { $nin: mergedInstructors }
        })
        .select("-password -refresh_token -role")
        .exec();

      return createResponse(200, 'Success', users);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }


  async getAllInstructors(): Promise<any> {
    try {
      const instructors = await this.userModel.find({ role: 'instructor' }).select('-password -refresh_token -role').exec();
      return createResponse(200, 'Success', instructors);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (user) {
        return createResponse(200, 'Success', user);
      } else {
        return createResponse(404, 'User not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getInfoUser(user: User): Promise<any> {
    const { id, role } = user;
    try {
      const user = await this.userModel.findById(id).select('-password -refresh_token').exec();
      if (user) {
        return createResponse(200, 'Success', user);
      } else {
        return createResponse(404, 'User not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createUser(user: CreateUserDto): Promise<any> {
    try {
      const { username, email, password } = user;

      const existingUserByUsername = await this.userModel
        .findOne({ username })
        .exec();
      if (existingUserByUsername) {
        return createResponse(400, 'Username already exists');
      }

      const existingUserByEmail = await this.userModel
        .findOne({ email })
        .exec();
      if (existingUserByEmail) {
        return createResponse(400, 'Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = new this.userModel({
        ...user,
        password: hashedPassword,
      });
      await createdUser.save();

      return createResponse(201, 'User created', createdUser);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updateUser(id: string, user: User): Promise<any> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, user, { new: true })
        .exec();
      if (updatedUser) {
        return createResponse(200, 'User updated', updatedUser);
      } else {
        return createResponse(404, 'User not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (deletedUser) {
        return createResponse(200, 'User deleted', deletedUser);
      } else {
        return createResponse(404, 'User not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async verifyUser(user: {
    _id: string;
    role: string;
    refresh_token: string;
  }): Promise<any> {
    const { _id, role, refresh_token } = user;
    return await this.userModel.findOne({ _id, role, refresh_token });
  }

  async validateUser(
    user: LoginDto,
  ): Promise<{ _id: string; role: string } | null> {
    const { username, password } = user;
    const findUser = await this.userModel.findOne({ username }).exec();

    if (findUser) {
      const isPasswordValid = await findUser.comparePassword(password);

      if (isPasswordValid) {
        const { _id, role } = findUser;
        return { _id, role };
      }
    }

    return null;
  }
}

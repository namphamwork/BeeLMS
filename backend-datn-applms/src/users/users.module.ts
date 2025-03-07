import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserModel } from './user.model';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClassroomModel } from 'src/classrooms/classroom.model';
@Module({
  imports: [UserModel,ClassroomModel],
  controllers: [UsersController],
  providers: [UsersService, JwtService, ConfigService],
})
export class UsersModule {}

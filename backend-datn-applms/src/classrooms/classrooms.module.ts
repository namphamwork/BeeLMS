import { Module } from '@nestjs/common';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';
import { ClassroomModel } from './classroom.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ClassroomModel],
  controllers: [ClassroomsController],
  providers: [ClassroomsService, JwtService],
})
export class ClassroomsModule {}

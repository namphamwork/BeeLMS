import { Module } from '@nestjs/common';
import { ResultAssignmentsController } from './resultAssignments.controller';
import { ResultAssignmentsService } from './resultAssignments.service';
import { ResultAssignmentModel } from './resultAssignment.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ResultAssignmentModel],
  controllers: [ResultAssignmentsController],
  providers: [ResultAssignmentsService, JwtService],
})
export class ResultAssignmentsModule {}

import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/course.model';
import { Room } from 'src/rooms/room.model';
import { User } from 'src/users/user.model';

export class CreateClassroomDto {
  @ApiProperty({ required: true })
  code: string;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  createBy: string;

  @ApiProperty()
  instructor?: string;

  @ApiProperty({ enum: [1, 2, 3, 4, 5, 6], required: true })
  hours: number;

  @ApiProperty({ enum: ['246', '357'], required: true })
  dayOfWeek: '246' | '357';

  @ApiProperty({ required: true })
  dateStart: Date;

  @ApiProperty({ required: true })
  dateEnd: Date;

  @ApiProperty({
    type: () => String,
    isArray: true,
    example: [{ _id: 'learnerId1' }, { _id: 'learnerId2' }],
  })
  learners?: User[];

  @ApiProperty({
    required: false,
    example: [
      { date: '2024-01-05', learners: ['learnerId1', 'learnerId2'] },
      { date: '2024-01-12', learners: ['learnerId3', 'learnerId4'] },
    ],
  })
  attendances: { date: Date; learners: string[] }[];

  @ApiProperty({
    required: false,
    example: [
      { learner: 'learnerId1', scores: [{ modelType: 'Lab', score: 'LabId1', value: 8.5 }, { modelType: 'Quiz', score: 'QuizId1', value: 7.5 }] },
      { learner: 'learnerId2', scores: [{ modelType: 'Quiz', score: 'QuizId1', value: 7.5 }, { modelType: 'Lab', score: 'LabId1', value: 8.5 }] },
    ],
  })
  marks: { learner: string; scores: { modelType: 'Lab' | 'Quiz'; score: string; value?: number | null }[] }[];

  @ApiProperty({ required: true })
  course: Course;

  @ApiProperty({ required: true })
  room: Room;
}


export class CheckBookingDto {
  @ApiProperty()
  hours: string;
  
  @ApiProperty()
  dayOfWeek: string;

  @ApiProperty()
  dateStart: Date;

  @ApiProperty()
  dateEnd: Date;
}

export class AttendanceDto {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  learners: string[];
}

export class UpdateMarksDto {
  @ApiProperty()
  learner: string;

  @ApiProperty()
  scores: ScoreDto[];
}


export class ScoreDto{
  @ApiProperty()
  modelType: string;

  @ApiProperty()
  score: string;

  @ApiProperty()
  value: number;
}
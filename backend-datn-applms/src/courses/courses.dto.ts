import { ApiProperty } from '@nestjs/swagger';
import { CreateAssignmentDto } from 'src/assignments/assignments.dto';
import { CreateCurriculumDto } from 'src/curriculums/curriculums.dto';
import { CreateLabDto } from 'src/labs/labs.dto';
import { CreateLessonDto } from 'src/lessons/lessons.dto';


export class CreateCourseDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ required: true })
  createBy: string;

  @ApiProperty({ type: [CreateLessonDto] })
  lessons?: CreateLessonDto[];

  @ApiProperty({ type: [CreateCurriculumDto] })
  curriculums?: CreateCurriculumDto[];

  @ApiProperty({ type: [CreateLabDto] })
  labs?: CreateLabDto[];

  @ApiProperty({ type: [CreateAssignmentDto] })
  assignments?: CreateAssignmentDto[];
}
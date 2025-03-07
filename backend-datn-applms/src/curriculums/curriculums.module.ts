import { Module } from '@nestjs/common';
import { CurriculumsController } from './curriculums.controller';
import { CurriculumsService } from './curriculums.service';
import { CurriculumModel } from './curriculum.model';

@Module({
  imports: [CurriculumModel],
  controllers: [CurriculumsController],
  providers: [CurriculumsService],
})
export class CurriculumsModule {}

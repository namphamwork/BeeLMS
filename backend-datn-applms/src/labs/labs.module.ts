import { Module } from '@nestjs/common';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { LabModel } from './lab.model';

@Module({
  imports: [LabModel],
  controllers: [LabsController],
  providers: [LabsService],
})
export class LabsModule {}

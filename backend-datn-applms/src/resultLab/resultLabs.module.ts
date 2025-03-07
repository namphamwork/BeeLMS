import { Module } from '@nestjs/common';
import { ResultLabsController } from './resultLabs.controller';
import { ResultLabsService } from './resultLabs.service';
import { ResultLabModel } from './resultLab.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ResultLabModel],
  controllers: [ResultLabsController],
  providers: [ResultLabsService, JwtService],
})
export class ResultLabsModule {}

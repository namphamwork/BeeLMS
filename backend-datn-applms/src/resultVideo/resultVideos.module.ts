import { Module } from '@nestjs/common';
import { ResultVideosController } from './resultVideos.controller';
import { ResultVideosService } from './resultVideos.service';
import { ResultVideoModel } from './resultVideo.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ResultVideoModel],
  controllers: [ResultVideosController],
  providers: [ResultVideosService, JwtService],
})
export class ResultVideosModule {}

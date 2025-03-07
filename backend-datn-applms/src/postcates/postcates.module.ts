import { Module } from '@nestjs/common';
import { PostCatesController } from './postcates.controller';
import { PostCatesService } from './postcates.service';
import { PostCateModel } from './postcate.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PostCateModel],
  controllers: [PostCatesController],
  providers: [PostCatesService, JwtService],
})
export class PostCatesModule { }

import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostModel } from './post.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PostModel],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
})
export class PostsModule { }

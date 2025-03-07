import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostType } from './post.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './posts.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('api/v1/posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all posts', operationId: 'getAllPosts' })
  async getAllPosts(): Promise<PostType[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get post by ID', operationId: 'getPostById' })
  async getPostById(@Param('id') id: string): Promise<PostType> {
    return this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new post', operationId: 'createPost' })
  async createPost(@Body() post: CreatePostDto): Promise<PostType> {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update post by ID', operationId: 'updatePost' })
  async updatePost(@Param('id') id: string, @Body() post: PostType): Promise<PostType> {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete post by ID', operationId: 'deletePost' })
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}

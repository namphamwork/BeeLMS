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
import { PostCatesService } from './postcates.service';
import { PostCateType } from './postcate.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostCateDto } from './postcates.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('api/v1/postCates')
@ApiTags('PostCates')
export class PostCatesController {
  constructor(private readonly postCatesService: PostCatesService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all postCates', operationId: 'getAllPostCates' })
  async getAllPostCates(): Promise<PostCateType[]> {
    return this.postCatesService.getAllPostCates();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get postCate by ID', operationId: 'getPostCateById' })
  async getPostCateById(@Param('id') id: string): Promise<PostCateType> {
    return this.postCatesService.getPostCateById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new postCate', operationId: 'createPostCate' })
  async createPostCate(@Body() postCate: CreatePostCateDto): Promise<PostCateType> {
    return this.postCatesService.createPostCate(postCate);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update postCate by ID', operationId: 'updatePostCate' })
  async updatePostCate(@Param('id') id: string, @Body() postCate: PostCateType): Promise<PostCateType> {
    return this.postCatesService.updatePostCate(id, postCate);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete postCate by ID', operationId: 'deletePostCate' })
  async deletePostCate(@Param('id') id: string): Promise<void> {
    return this.postCatesService.deletePostCate(id);
  }
}

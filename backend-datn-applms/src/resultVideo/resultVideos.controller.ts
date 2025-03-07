import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ResultVideosService } from './resultVideos.service';
import { ResultVideo } from './resultVideo.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckResultVideoDto, SaveResultVideoDto } from './resultVideos.dto';
import { RoleUser } from 'src/config/constants';
import { Roles } from 'src/guard/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesInterceptor } from 'src/guard/roles.interceptor';

@Controller('api/v1/result-videos')
@ApiTags('ResultVideos')
export class ResultVideosController {
  constructor(private readonly resultVideosService: ResultVideosService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all resultVideos', operationId: 'getAllResultVideos' })
  // async getAllResultVideos(): Promise<ResultVideo[]> {
  //   return this.resultVideosService.getAllResultVideos();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get resultVideo by ID', operationId: 'getResultVideoById' })
  // async getResultVideoById(@Param('id') id: string): Promise<ResultVideo> {
  //   return this.resultVideosService.getResultVideoById(id);
  // }

  // @Post()
  // @ApiOperation({ summary: 'Create a new resultVideo', operationId: 'createResultVideo' })
  // async createResultVideo(@Body() resultVideo: ResultVideo): Promise<ResultVideo> {
  //   return this.resultVideosService.createResultVideo(resultVideo);
  // }

  @Post('/save')
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.LEARNER)
  @ApiOperation({ summary: 'Save resultVideo', operationId: 'saveResultVideo' })
  async saveResultVideo(@Req() req: any,@Body() resultVideo: SaveResultVideoDto): Promise<ResultVideo> {
    return this.resultVideosService.saveResultVideo(req.user_data,resultVideo);
  }

  @Post('/check')
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.LEARNER)
  @ApiOperation({ summary: 'Check resultVideo', operationId: 'checkResultVideo' })
  async checkResultVideo(@Req() req: any,@Body() resultVideo: CheckResultVideoDto): Promise<ResultVideo> {
    return this.resultVideosService.checkResultVideo(req.user_data,resultVideo);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update resultVideo by ID', operationId: 'updateResultVideo' })
  // async updateResultVideo(@Param('id') id: string, @Body() resultVideo: ResultVideo): Promise<ResultVideo> {
  //   return this.resultVideosService.updateResultVideo(id, resultVideo);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete resultVideo by ID', operationId: 'deleteResultVideo' })
  // async deleteResultVideo(@Param('id') id: string): Promise<void> {
  //   return this.resultVideosService.deleteResultVideo(id);
  // }
}

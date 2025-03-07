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
import { ResultLabsService } from './resultLabs.service';
import { ResultLab } from './resultLab.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckResultLabDto, SaveResultLabDto } from './resultLabs.dto';
import { RoleUser } from 'src/config/constants';
import { Roles } from 'src/guard/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesInterceptor } from 'src/guard/roles.interceptor';

@Controller('api/v1/result-labs')
@ApiTags('ResultLabs')
export class ResultLabsController {
  constructor(private readonly resultLabsService: ResultLabsService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all resultLabs', operationId: 'getAllResultLabs' })
  // async getAllResultLabs(): Promise<ResultLab[]> {
  //   return this.resultLabsService.getAllResultLabs();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get resultLab by ID', operationId: 'getResultLabById' })
  // async getResultLabById(@Param('id') id: string): Promise<ResultLab> {
  //   return this.resultLabsService.getResultLabById(id);
  // }

  // @Post()
  // @ApiOperation({ summary: 'Create a new resultLab', operationId: 'createResultLab' })
  // async createResultLab(@Body() resultLab: ResultLab): Promise<ResultLab> {
  //   return this.resultLabsService.createResultLab(resultLab);
  // }

  @Post('/save')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Save resultLab', operationId: 'saveResultLab' })
  async saveResultLab(@Req() req: any,@Body() resultLab: SaveResultLabDto): Promise<ResultLab> {
    return this.resultLabsService.saveResultLab(req.user_data,resultLab);
  }

  @Post('/check')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Check resultLab', operationId: 'checkResultLab' })
  async checkResultLab(@Req() req: any,@Body() resultLab: CheckResultLabDto): Promise<ResultLab> {
    return this.resultLabsService.checkResultLab(req.user_data,resultLab);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update resultLab by ID', operationId: 'updateResultLab' })
  // async updateResultLab(@Param('id') id: string, @Body() resultLab: ResultLab): Promise<ResultLab> {
  //   return this.resultLabsService.updateResultLab(id, resultLab);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete resultLab by ID', operationId: 'deleteResultLab' })
  // async deleteResultLab(@Param('id') id: string): Promise<void> {
  //   return this.resultLabsService.deleteResultLab(id);
  // }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Classroom } from './classroom.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/guard/roles.decorator';
import { RolesInterceptor } from 'src/guard/roles.interceptor';
import { RoleUser } from 'src/config/constants';
import { AttendanceDto, CheckBookingDto, CreateClassroomDto, UpdateMarksDto } from './classrooms.dto';

@Controller('api/v1/classrooms')
@ApiTags('Classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) { }

  @Get()
  @ApiOperation({
    summary: 'Get all classrooms',
    operationId: 'getAllClassrooms',
  })
  @UseGuards(AuthGuard)
  async getAllClassrooms(): Promise<Classroom[]> {
    return this.classroomsService.getAllClassrooms();
  }

  @Get('myclass')
  @ApiOperation({
    summary: 'Get all my classrooms',
    operationId: 'getAllMyClassrooms',
  })
  @UseGuards(AuthGuard)
  async getAllMyClassrooms(@Req() req: any): Promise<Classroom[]> {
    return this.classroomsService.getAllMyClassrooms(req.user_data);
  }

  @Get('table-marks/:idClassRoom')
  @ApiOperation({
    summary: 'Get classroom by ID',
    operationId: 'getClassroomById',
  })
  @UseGuards(AuthGuard)
  async getTableMarksByClassroomId(@Req() req: any,@Param('idClassRoom') idClassRoom: string): Promise<Classroom> {
    return this.classroomsService.getTableMarksByIdClass(idClassRoom, req.user_data);
  }

  @Get('marks/:idClassRoom')
  @ApiOperation({
    summary: 'Get classroom by ID',
    operationId: 'getClassroomById',
  })
  @UseGuards(AuthGuard)
  async getMarksByClassroomId(@Req() req: any, @Param('idClassRoom') idClassRoom: string): Promise<Classroom> {
    return this.classroomsService.getMarksByClassroomId(idClassRoom, req.user_data);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get classroom by ID',
    operationId: 'getClassroomById',
  })
  @UseGuards(AuthGuard)
  async getClassroomById(@Param('id') id: string): Promise<Classroom> {
    return this.classroomsService.getClassroomById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new classroom',
    operationId: 'createClassroom',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async createClassroom(
    @Req() req: any,
    @Body() classroom: CreateClassroomDto,
  ): Promise<any> {
    return this.classroomsService.createClassroom(req.user_data, classroom);
  }

  @Put('attendances/:idClassRoom')
  @ApiOperation({
    summary: 'Update attendence classroom by ID',
    operationId: 'updateAttendencesClassroom',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async updateAttendanceByClassroomId(
    @Param('idClassRoom') idClassRoom: string,
    @Body() attendance: AttendanceDto,
  ): Promise<Classroom> {
    return this.classroomsService.updateAttendanceByClassroomId(idClassRoom, attendance);
  }

  @Put('marks/:idClassRoom')
  @ApiOperation({
    summary: 'Update attendence classroom by ID',
    operationId: 'updateAttendencesClassroom',
  })
  // @UseGuards(AuthGuard)
  // @UseInterceptors(RolesInterceptor)
  // @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async updateMarksByClassroomId(
    @Param('idClassRoom') idClassRoom: string,
    @Body() marks: UpdateMarksDto[],
  ): Promise<Classroom> {
    return this.classroomsService.updateMarksByClassroomId(idClassRoom, marks);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update classroom by ID',
    operationId: 'updateClassroom',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async updateClassroom(
    @Param('id') id: string,
    @Body() classroom: Classroom,
  ): Promise<Classroom> {
    return this.classroomsService.updateClassroom(id, classroom);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete classroom by ID',
    operationId: 'deleteClassroom',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN)
  async deleteClassroom(@Param('id') id: string): Promise<void> {
    return this.classroomsService.deleteClassroom(id);
  }


  @Post('checkroom')
  @ApiOperation({
    summary: 'Check room',
    operationId: 'checkRoom',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async checkRoom(
    @Req() req: any,
    @Body() booking: CheckBookingDto,
  ): Promise<any> {
    return this.classroomsService.checkBooking(booking);
  }
}

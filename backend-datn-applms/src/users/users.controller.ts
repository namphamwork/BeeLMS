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
import { UsersService } from './users.service';
import { User } from './user.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesInterceptor } from 'src/guard/roles.interceptor';
import { Roles } from 'src/guard/roles.decorator';
import { RoleUser } from 'src/config/constants';
import { CreateUserDto } from './users.dto';
import { CheckBookingDto } from 'src/classrooms/classrooms.dto';

@Controller('api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', operationId: 'getAllUsers' })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('info')
  @ApiOperation({
    summary: 'Get Info User',
    operationId: 'getInfoUser',
  })
  @UseGuards(AuthGuard)
  async getInfoUser(@Req() req: any): Promise<any> {
    return this.usersService.getInfoUser(req.user_data);
  }

  @Get('leanrs')
  @ApiOperation({
    summary: 'Get All learner',
    operationId: 'getAllLearner',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async getAllLearners(): Promise<any> {
    return this.usersService.getAllLearners();
  }
  
  @Get('instructors')
  @ApiOperation({
    summary: 'Get All instructor',
    operationId: 'getAllInstructor',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async getAllInstructors(): Promise<any> {
    return this.usersService.getAllInstructors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID', operationId: 'getUserById' })
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user', operationId: 'createUser' })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN)
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Post('learnersEmptyClass')
  @ApiOperation({
    summary: 'Get List Learner Empty Class',
    operationId: 'leanrsEmptyClass',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async leanrsEmptyClass(
    @Req() req: any,
    @Body() booking: CheckBookingDto,
  ): Promise<any> {
    return this.usersService.leanrsEmptyClass(booking);
  }

  @Post('instructorsEmptyClass')
  @ApiOperation({
    summary: 'Get List Instructors Empty Class',
    operationId: 'instructorsEmptyClass',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN, RoleUser.INSTRUCTOR)
  async instructorsEmptyClass(
    @Req() req: any,
    @Body() booking: CheckBookingDto,
  ): Promise<any> {
    return this.usersService.instructorsEmptyClass(booking);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID', operationId: 'updateUser' })
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID', operationId: 'deleteUser' })
  @UseGuards(AuthGuard)
  @UseInterceptors(RolesInterceptor)
  @Roles(RoleUser.ADMIN, RoleUser.SUBADMIN)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

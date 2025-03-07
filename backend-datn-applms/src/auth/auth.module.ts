import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/user.model';
import { ConfigModule } from '@nestjs/config';
import { ClassroomModel } from 'src/classrooms/classroom.model';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    UserModel, ClassroomModel,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule { }

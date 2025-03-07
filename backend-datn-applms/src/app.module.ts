import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './files/files.module';
import { QuizsModule } from './quizs/quizs.module';
import { LabsModule } from './labs/labs.module';
import { CurriculumsModule } from './curriculums/curriculums.module';
import { LessonsModule } from './lessons/lessons.module';
import { RoomsModule } from './rooms/rooms.module';
import { ResultVideosModule } from './resultVideo/resultVideos.module';
import { ResultQuizsModule } from './resultQuiz/resultQuizs.module';
import { AssignmentModel } from './assignments/assignment.model';
import { ResultLabsModule } from './resultLab/resultLabs.module';
import { ResultAssignmentsModule } from './resultAssignment/resultAssignments.module';
import { RoomChatsModule } from './roomChat/roomchats.module';
import { PostsModule } from './posts/posts.module';
import { PostCatesModule } from './postcates/postcates.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE),
    UsersModule,
    CoursesModule,
    ClassroomsModule,
    QuizsModule,
    CurriculumsModule,
    LabsModule,
    AssignmentModel,
    LessonsModule,
    FileModule,
    RoomsModule,
    ResultVideosModule,
    ResultQuizsModule,
    ResultLabsModule,
    ResultAssignmentsModule,
    RoomChatsModule,
    PostsModule,
    PostCatesModule,
    SocketModule,
    AuthModule,
  ],
})
export class AppModule {}

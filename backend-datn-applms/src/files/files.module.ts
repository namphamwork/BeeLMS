import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './files.controller';
import { FileService } from './files.service';

@Module({
  imports: [MulterModule.register()],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}

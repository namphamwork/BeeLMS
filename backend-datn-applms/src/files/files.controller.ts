import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { createResponse } from 'src/util/util';
import { createMulterOptions } from './fileUploadConfig';
import { FileService } from './files.service';

@Controller('api/v1/files')
@ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('image')
  @UseInterceptors(FileInterceptor('image', createMulterOptions('image')))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        return createResponse(200, 'Upload file successful', file);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 10, createMulterOptions('image')))
  uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      if (files && files.length > 0) {
        return createResponse(200, 'Upload file successful', files);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  @Post('curriculum')
  @UseInterceptors(FileInterceptor('curriculum', createMulterOptions('curriculum')))
  uploadCurriculum(@UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        return createResponse(200, 'Upload file successful', file);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  @Post('curriculums')
  @UseInterceptors(FilesInterceptor('curriculums', 10, createMulterOptions('curriculum')))
  uploadCurriculums(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      if (files && files.length > 0) {
        return createResponse(200, 'Upload file successful', files);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  @Post('lab')
  @UseInterceptors(FileInterceptor('lab', createMulterOptions('lab')))
  uploadLab(@UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        return createResponse(200, 'Upload file successful', file);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  @Post('labs')
  @UseInterceptors(FilesInterceptor('labs', 10, createMulterOptions('lab')))
  uploadLabs(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      if (files && files.length > 0) {
        return createResponse(200, 'Upload file successful', files);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  @Post('assignment')
  @UseInterceptors(FileInterceptor('assignment', createMulterOptions('assignment')))
  uploadAssignment(@UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        return createResponse(200, 'Upload file successful', file);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  @Post('assignments')
  @UseInterceptors(FilesInterceptor('assignments', 10, createMulterOptions('assignment')))
  uploadAssignments(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      if (files && files.length > 0) {
        return createResponse(200, 'Upload file successful', files);
      }else{
        return createResponse(400, 'Upload file failed');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}

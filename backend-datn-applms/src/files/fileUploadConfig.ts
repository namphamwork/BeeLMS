import {
  BadRequestException
} from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const createMulterOptions = (type: string): MulterOptions => {
  let allowedFileTypes: string[];

  if (type === 'image') {
    allowedFileTypes = ['image/jpeg', 'image/png'];
  }
  if (type === 'curriculum' || type === 'lab' || type === 'assignment') {
    allowedFileTypes = [
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/csv',
    ];
  }

  return {
    dest: './public/uploads/' + type + 's',
    fileFilter: (req, file, callback) => {
      if (allowedFileTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new BadRequestException('Invalid file type'), false);
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 50, // Kích thước tối đa 50MB
    },
    storage: diskStorage({
      destination: './public/uploads/' + type + 's',
      filename: (req, file, callback) => {
        const uniqueFileName = uuidv4() + file.originalname;
        callback(null, uniqueFileName);
      },
    }),
  };
};

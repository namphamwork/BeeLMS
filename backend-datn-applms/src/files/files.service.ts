import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  private allowedExtensions = ['.jpg', '.jpeg', '.png'];

  async saveFile(file: Express.Multer.File): Promise<string> {
    return 'true';
  }
}

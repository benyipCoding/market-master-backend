import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async createKLineFromExcel(file: Express.Multer.File) {
    console.log(file);
  }
}

import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('k-line')
  @UseInterceptors(FileInterceptor('file'))
  uploadKLineData(@UploadedFile() file: Express.Multer.File) {
    this.uploadService.createKLineFromExcel(file);
  }
}

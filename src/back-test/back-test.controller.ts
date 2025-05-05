import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BackTestService } from './back-test.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CreateRecordDto } from './dto/create-record.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('back-test')
@UseGuards(JwtAuthGuard)
export class BackTestController {
  constructor(private readonly backTestService: BackTestService) {}

  @Post()
  createRecord(
    @CurrentUser() user: User,
    @Body() createRecordDto: CreateRecordDto,
  ) {
    return this.backTestService.createOrUpdateRecord(user, createRecordDto);
  }

  @Delete(':key')
  deleteRecord(@Param('key') key: string) {
    return this.backTestService.deleteRecord(key);
  }

  @Get()
  getRecord(@CurrentUser() user: User) {
    return this.backTestService.getRecord(user);
  }
}

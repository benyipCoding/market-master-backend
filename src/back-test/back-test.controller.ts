import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}

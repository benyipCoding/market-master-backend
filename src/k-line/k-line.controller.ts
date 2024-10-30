import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateKlineDto } from './dto/create-kline.dto';
import { KLineService } from './k-line.service';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('k-line')
@UseGuards(JwtAuthGuard)
export class KLineController {
  constructor(private readonly kLineService: KLineService) {}

  @Post('bulk')
  createKLines(
    @Body() createKLineDto: CreateKlineDto,
    @CurrentUser() user: User,
  ) {
    return this.kLineService.bulkCreate(createKLineDto, user);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateKlineDto } from './dto/create-kline.dto';
import { KLineService } from './k-line.service';

@Controller('k-line')
@UseGuards(JwtAuthGuard)
export class KLineController {
  constructor(private readonly kLineService: KLineService) {}

  @Post()
  create(@Body() createKLineDto: CreateKlineDto) {
    this.kLineService.create(createKLineDto);
  }
}

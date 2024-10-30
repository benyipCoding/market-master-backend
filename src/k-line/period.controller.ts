import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePeriodDto } from './dto/create-period.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('period')
@UseGuards(JwtAuthGuard)
export class PeriodController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createPeriod(@Body() createPeriodDto: CreatePeriodDto) {
    return await this.prismaService.period.create({
      data: {
        label: createPeriodDto.label,
      },
    });
  }
}

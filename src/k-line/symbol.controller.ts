import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('symbol')
@UseGuards(JwtAuthGuard)
export class SymbolController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createSymbol(@Body() dto: CreateSymbolDto) {
    return await this.prismaService.symbol.create({
      data: {
        label: dto.label,
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
      },
    });
  }

  @Get()
  async list() {
    return await this.prismaService.symbol.findMany({
      select: {
        id: true,
        label: true,
        category_id: true,
        description: true,
        basic_point_place: true,
      },
    });
  }
}

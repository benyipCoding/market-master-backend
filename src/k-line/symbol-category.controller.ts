import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuperUserGuard } from 'src/auth/guards/super-user.guard';

@Controller('symbol-category')
@UseGuards(JwtAuthGuard)
export class SymbolCategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @UseGuards(SuperUserGuard)
  async createSymbolCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.symbolCategory.create({
      data: { name: createCategoryDto.name },
    });
  }

  @Get()
  async list() {
    return await this.prismaService.symbolCategory.findMany({
      select: {
        id: true,
        name: true,
        parent_id: true,
      },
      orderBy: {
        sort: 'asc',
      },
    });
  }
}

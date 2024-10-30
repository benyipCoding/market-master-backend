import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('symbol-category')
@UseGuards(JwtAuthGuard)
export class SymbolCategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createSymbolCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.symbolCategory.create({
      data: { name: createCategoryDto.name },
    });
  }
}

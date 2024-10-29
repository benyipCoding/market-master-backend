import { Injectable } from '@nestjs/common';
import { CreateKlineDto } from './dto/create-kline.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { KLine } from '@prisma/client';
import { SnowflakeService } from './snowflake.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreatePeriodDto } from './dto/create-period.dto';

@Injectable()
export class KLineService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly snowflakeService: SnowflakeService,
  ) {}

  async bulkCreate(createKLineDto: CreateKlineDto) {
    console.log(createKLineDto);

    // const data: KLine[] = createKLineDto.data.map((item) => ({
    //   ...item,
    //   id: this.snowflakeService.generateId(),
    //   period: createKLineDto.period,
    //   precision: createKLineDto.precision,
    //   symbol: createKLineDto.symbol,
    // }));

    // await this.prismaService.kLine.createMany({
    //   data,
    // });
    return 'OK';
  }

  async createCategory(dto: CreateCategoryDto) {
    return this.prismaService.symbolCategory.create({
      data: {
        name: dto.name,
      },
    });
  }

  async createPeriod(dto: CreatePeriodDto) {
    return this.prismaService.period.create({
      data: {
        label: dto.label,
      },
    });
  }
}

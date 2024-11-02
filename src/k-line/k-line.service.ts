import { Injectable } from '@nestjs/common';
import { CreateKlineDto } from './dto/create-kline.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SnowflakeService } from './snowflake.service';
import { KLine, User } from '@prisma/client';
import { ListKlineDto } from './dto/list-kline.dto';

@Injectable()
export class KLineService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly snowflakeService: SnowflakeService,
  ) {}

  bulkCreate(createKLineDto: CreateKlineDto, user: User) {
    const data: KLine[] = createKLineDto.data.map((item) => ({
      id: this.snowflakeService.generateId(),
      ...item,
      symbol_id: createKLineDto.symbol,
      period_id: createKLineDto.period,
      creator_id: user.id,
      precision: createKLineDto.precision,
    }));

    return this.prismaService.kLine.createMany({
      data,
    });
  }

  async list(dto: ListKlineDto) {
    const klineData = await this.prismaService.kLine.findMany({
      where: {
        symbol_id: dto.symbol,
        period_id: dto.period,
      },
      select: {
        id: true,
        open: true,
        high: true,
        low: true,
        close: true,
        timestamp: true,
        volume: true,
        precision: true,
      },
    });

    // 转换 BigInt 字段为字符串
    const formattedData = klineData.map((k) => ({
      ...k,
      open: +k.open,
      high: +k.high,
      low: +k.low,
      close: +k.close,
      id: k.id.toString(),
      timestamp: +k.timestamp.toString(),
    }));

    return formattedData;
  }
}

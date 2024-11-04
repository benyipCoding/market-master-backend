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

  async bulkCreate(createKLineDto: CreateKlineDto, user: User) {
    const filterData: any[] = [];
    const tasks: Promise<KLine | void>[] = [];

    for (const item of createKLineDto.data) {
      const promise = this.prismaService.kLine.findUnique({
        where: {
          symbol_id_period_id_timestamp: {
            symbol_id: createKLineDto.symbol,
            period_id: createKLineDto.period,
            timestamp: item.timestamp,
          },
        },
      });

      const _fulfilled = (res: KLine | null) => {
        if (res) return;
        const kline = {
          id: this.snowflakeService.generateId(),
          ...item,
          symbol_id: createKLineDto.symbol,
          period_id: createKLineDto.period,
          creator_id: user.id,
          precision: createKLineDto.precision,
        };

        filterData.push(kline);
      };

      promise.then(_fulfilled);
      tasks.push(promise);
    }

    await Promise.all(tasks);

    if (!filterData.length) return 'Data is already existed';

    try {
      await this.prismaService.kLine.createMany({
        data: filterData,
      });

      return 'Success';
    } catch (error) {
      throw new Error(error.message);
    }
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
        create_at: true,
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

  async deleteMeaninglessData() {
    return this.prismaService.kLine.deleteMany({
      where: {
        timestamp: {
          lt: 757353600000, // 删除1994-1-1之前的所有数据
        },
      },
    });
  }
}

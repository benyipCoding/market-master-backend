import { Injectable } from '@nestjs/common';
import { CreateKlineDto } from './dto/create-kline.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SnowflakeService } from './snowflake.service';
import { User } from '@prisma/client';

@Injectable()
export class KLineService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly snowflakeService: SnowflakeService,
  ) {}

  async bulkCreate(createKLineDto: CreateKlineDto, user: User) {
    console.log(createKLineDto);
    console.log(user);

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
}

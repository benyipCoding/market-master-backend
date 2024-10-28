import { KLine } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  IsUppercase,
  ValidateNested,
} from 'class-validator';

export class KLineDto {
  @IsNumber()
  timestamp: number;

  @IsNumber()
  open: number;

  @IsNumber()
  high: number;

  @IsNumber()
  low: number;

  @IsNumber()
  close: number;

  @IsNumber()
  volume?: number;
}

export class CreateKlineDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KLineDto)
  data: Pick<
    KLine,
    'open' | 'high' | 'low' | 'close' | 'timestamp' | 'volume'
  >[];

  @IsString()
  @IsUppercase()
  symbol: string;

  @IsString()
  period: string;

  @IsNumber()
  precision: number;
}

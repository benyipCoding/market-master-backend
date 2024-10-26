import { IsNumber, IsString, IsUppercase } from 'class-validator';

export class CreateKlineDto {
  @IsString()
  @IsUppercase()
  symbol: string;

  @IsString()
  period: string;

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

  @IsNumber()
  precision: number;
}

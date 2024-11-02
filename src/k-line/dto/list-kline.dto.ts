import { IsNumber } from 'class-validator';

export class ListKlineDto {
  @IsNumber()
  symbol: number;

  @IsNumber()
  period: number;
}

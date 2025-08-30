import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsBoolean()
  stopLossActive: boolean;

  @IsBoolean()
  takeProfitActive: boolean;

  @IsNumber()
  stopLossValue: number;

  @IsNumber()
  takeProfitValue: number;
}

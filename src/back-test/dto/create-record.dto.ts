import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { OperationMode } from 'src/orders/dto/create-order.dto';

export class CreateRecordDto {
  @IsEnum(OperationMode)
  @IsNotEmpty()
  operation_mode: OperationMode;

  @IsNumber()
  @IsNotEmpty()
  latest_price: number;

  @IsNumber()
  @IsNotEmpty()
  symbol_id: number;

  @IsNumber()
  @IsNotEmpty()
  period_id: number;

  @IsNumber()
  @IsNotEmpty()
  sliceLeft: number;

  @IsNumber()
  @IsNotEmpty()
  sliceRight: number;
}

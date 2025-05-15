import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from './create-order.dto';

export class ListOrderDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  orderStatus: OrderStatus;

  @IsNotEmpty()
  @IsString()
  backtest_id: string;
}

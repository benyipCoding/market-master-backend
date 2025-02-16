import { IsEnum, IsNotEmpty } from 'class-validator';
import { OperationMode, OrderStatus } from './create-order.dto';

export class ListOrderDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  orderStatus: OrderStatus;

  @IsEnum(OperationMode)
  @IsNotEmpty()
  operationMode: OperationMode;
}

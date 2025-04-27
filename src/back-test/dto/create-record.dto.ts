import { IsEnum, IsNotEmpty } from 'class-validator';
import { OperationMode } from 'src/orders/dto/create-order.dto';

export class CreateRecordDto {
  @IsEnum(OperationMode)
  @IsNotEmpty()
  operation_mode: OperationMode;
}

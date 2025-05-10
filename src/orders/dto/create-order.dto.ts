import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum OrderType {
  MARKET = 'market',
  LIMIT = 'limit',
}

export enum OrderSide {
  BUY = 'buy',
  SELL = 'sell',
}

export enum OrderStatus {
  PENDING = 'pending',
  EXECUTED = 'executed',
  CANCELLED = 'cancelled',
  CLOSED = 'closed',
}

export enum OperationMode {
  PRACTISE = 'Practise',
  BLINDBOX = 'Blindbox',
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  symbol_id: number;

  @IsEnum(OrderType)
  @IsNotEmpty()
  order_type: OrderType;

  @IsEnum(OrderSide)
  @IsNotEmpty()
  side: OrderSide;

  @IsNumber()
  @IsNotEmpty()
  opening_price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  @IsOptional()
  limit_price?: number;

  @IsNumber()
  @IsOptional()
  stop_price?: number;

  @IsNumber()
  @IsNotEmpty()
  time: number;

  @IsDate()
  @IsOptional()
  expiry_time?: Date;

  @IsEnum(OperationMode)
  @IsNotEmpty()
  operation_mode: OperationMode;

  @IsNotEmpty()
  @IsString()
  backtest_id: string;
}

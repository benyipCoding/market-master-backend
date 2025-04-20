import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderStatus, OrderType } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SnowflakeService } from 'src/k-line/snowflake.service';
import { ListOrderDto } from './dto/list-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly snowflakeService: SnowflakeService,
  ) {}
  async create(user: User, createOrderDto: CreateOrderDto) {
    const order = await this.prismaService.order.create({
      data: {
        id: this.snowflakeService.generateId(),
        user_id: user.id,
        opening_price: createOrderDto.opening_price,
        order_type: createOrderDto.order_type,
        quantity: createOrderDto.quantity,
        side: createOrderDto.side,
        status:
          createOrderDto.order_type === OrderType.MARKET
            ? OrderStatus.EXECUTED
            : OrderStatus.PENDING,
        time: createOrderDto.time,
        symbol_id: createOrderDto.symbol_id,
        executed_time:
          createOrderDto.order_type === OrderType.MARKET ? new Date() : null,
        operation_mode: createOrderDto.operation_mode,
        stop_price: createOrderDto.stop_price || null,
        limit_price: createOrderDto.limit_price || null,
      },
    });

    return order;
  }

  async list(user: User, listOrderDto: ListOrderDto) {
    return await this.prismaService.order.findMany({
      where: {
        user_id: user.id,
        status: listOrderDto.orderStatus,
        operation_mode: listOrderDto.operationMode,
      },
    });
  }

  async closePosition(user: User, orderId: bigint) {
    const order = await this.prismaService.order.findFirstOrThrow({
      where: {
        id: orderId,
        user_id: user.id,
      },
    });
    console.log('@@@@', order);

    return order;
  }
}

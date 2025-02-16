import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderStatus, OrderType } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, User } from '@prisma/client';
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
      },
    });

    return this.formatData([order])[0];
  }

  async list(user: User, listOrderDto: ListOrderDto) {
    return await this.prismaService.order
      .findMany({
        where: {
          user_id: user.id,
          status: listOrderDto.orderStatus,
          operation_mode: listOrderDto.operationMode,
        },
      })
      .then((res) => this.formatData(res));
  }

  private formatData(orders: Order[]) {
    return orders.map((order) => ({
      ...order,
      id: order.id.toString(),
      quantity: order.quantity.toString(),
      time: order.time.toString(),
    }));
  }
}

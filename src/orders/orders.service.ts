import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderStatus, OrderType } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SnowflakeService } from 'src/k-line/snowflake.service';

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
      },
    });

    const formattedOrder = {
      ...order,
      id: order.id.toString(),
      quantity: order.quantity.toString(),
      time: order.time.toString(),
    };

    return formattedOrder;
  }

  // findAll() {
  //   return `This action returns all orders`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}

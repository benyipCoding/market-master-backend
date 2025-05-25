import { BackTestService } from './../back-test/back-test.service';
import { Injectable } from '@nestjs/common';
import {
  CreateOrderDto,
  OperationMode,
  OrderSide,
  OrderStatus,
  OrderType,
} from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, User } from '@prisma/client';
import { SnowflakeService } from 'src/k-line/snowflake.service';
import { ListOrderDto } from './dto/list-order.dto';
import { RedisService } from 'src/redis/redis.service';
import Big from 'big.js';
import { Decimal } from '@prisma/client/runtime/library';

export enum ClosePosAction {
  Actively = 0,
  StopLoss = 1,
  TakeProfit = 2,
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly snowflakeService: SnowflakeService,
    private readonly redisService: RedisService,
    private readonly backTestService: BackTestService,
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
        backtest_id: createOrderDto.backtest_id,
      },
    });

    return this.formatData([order])[0];
  }

  async list(user: User, listOrderDto: ListOrderDto) {
    const res = await this.prismaService.order.findMany({
      where: {
        user_id: user.id,
        status: listOrderDto.orderStatus,
        backtest_id: listOrderDto.backtest_id,
      },
    });
    return res.map((item) => ({
      ...item,
      id: item.id.toString(),
      quantity: item.quantity.toString(),
      time: item.time.toString(),
    }));
  }

  async closePosition(user: User, orderId: bigint, action: ClosePosAction) {
    const order = await this.prismaService.order.findFirstOrThrow({
      where: {
        id: orderId,
        user_id: user.id,
      },
    });

    const symbol = await this.prismaService.symbol.findUnique({
      where: {
        id: order.symbol_id,
      },
    });

    // 获取BackTest的最新价格
    const record = await this.redisService.get(
      this.backTestService.generateKey(user),
    );

    const { latest_price, operation_mode } = JSON.parse(record);

    const price =
      action === ClosePosAction.StopLoss
        ? order.stop_price
        : action === ClosePosAction.TakeProfit
          ? order.limit_price
          : latest_price;

    // 结算盈亏
    const profit = this.calProfit(
      order.side as OrderSide,
      Number(order.opening_price),
      Number(price),
      Number(order.quantity),
      symbol.price_per_tick,
    );

    // 更新用户的余额
    const { id, balance_b, balance_p } =
      await this.prismaService.profile.findUnique({
        where: { user_id: user.id },
      });

    if (operation_mode === OperationMode.PRACTISE) {
      await this.prismaService.profile.update({
        where: { id },
        data: {
          balance_p: new Decimal(balance_p).add(profit),
        },
      });
    } else {
      await this.prismaService.profile.update({
        where: { id },
        data: {
          balance_b: new Decimal(balance_b).add(profit),
        },
      });
    }

    // 更新订单状态
    const closedOrder = await this.prismaService.order.update({
      where: { id: order.id },
      data: {
        closing_price: new Decimal(price),
        status: OrderStatus.CLOSED,
        profit: new Decimal(profit),
      },
    });

    return this.formatData([closedOrder])[0];
  }

  private formatData(orders: Order[]) {
    return orders.map((order) => ({
      ...order,
      id: order.id.toString(),
      quantity: order.quantity.toString(),
      time: order.time.toString(),
    }));
  }

  private calProfit(
    side: OrderSide,
    opening_price: number,
    price: number,
    unit: number,
    price_per_tick: number,
  ) {
    if (side === OrderSide.BUY) {
      return Number(
        new Big(price)
          .minus(opening_price)
          .div(price_per_tick)
          .times(unit)
          .div(100)
          .toFixed(2),
      );
    } else {
      return Number(
        new Big(opening_price)
          .minus(price)
          .div(price_per_tick)
          .times(unit)
          .div(100)
          .toFixed(2),
      );
    }
  }
}

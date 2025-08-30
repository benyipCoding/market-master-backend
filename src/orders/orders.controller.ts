import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListOrderDto } from './dto/list-order.dto';
import { ParseBigIntPipe } from 'src/pipes/parse-big-int.pipe';
import { UpdateOrderDto } from './dto/update-order.dto';

export enum ClosePosAction {
  Actively = 0,
  StopLoss = 1,
  TakeProfit = 2,
}

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(user, createOrderDto);
  }

  @Get()
  list(@CurrentUser() user: User, @Query() listOrderDto: ListOrderDto) {
    return this.ordersService.list(user, listOrderDto);
  }

  @Post('close-pos/:id')
  closePosition(
    @CurrentUser() user: User,
    @Param('id', ParseBigIntPipe) orderId: bigint,
    @Query('action') action: ClosePosAction,
  ) {
    return this.ordersService.closePosition(user, orderId, action);
  }

  @Get(':id')
  retrive(@Param('id', ParseBigIntPipe) orderId: bigint) {
    return this.ordersService.retrive(orderId);
  }

  @Patch(':id')
  updateOrder(
    @Param('id', ParseBigIntPipe) orderId: bigint,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrder(orderId, updateOrderDto);
  }
}

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ListOrderDto } from './dto/list-order.dto';

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
  closePosition(@CurrentUser() user: User, @Param('id') orderId: string) {
    return this.ordersService.closePosition(user, orderId);
  }
}

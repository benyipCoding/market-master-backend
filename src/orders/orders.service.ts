import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(user: User, createOrderDto: CreateOrderDto) {
    console.log(user);

    // this.prismaService.order.create({
    //   data: {
    //     user_id: user.id,
    //     "opening_price":
    //   },
    // });
    console.log(user, createOrderDto);

    return `${user.email}`;
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

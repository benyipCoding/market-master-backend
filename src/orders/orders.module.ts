import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SnowflakeService } from 'src/k-line/snowflake.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [OrdersController],
  providers: [OrdersService, SnowflakeService],
})
export class OrdersModule {}

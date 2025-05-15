import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SnowflakeService } from 'src/k-line/snowflake.service';
import { RedisModule } from 'src/redis/redis.module';
import { BackTestModule } from 'src/back-test/back-test.module';

@Module({
  imports: [PrismaModule, RedisModule, BackTestModule],
  controllers: [OrdersController],
  providers: [OrdersService, SnowflakeService],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { BackTestService } from './back-test.service';
import { BackTestController } from './back-test.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [BackTestController],
  providers: [BackTestService],
  exports: [BackTestService],
})
export class BackTestModule {}

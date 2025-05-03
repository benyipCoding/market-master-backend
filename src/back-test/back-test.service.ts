import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateRecordDto } from './dto/create-record.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BackTestService {
  constructor(private readonly redisService: RedisService) {}

  async createOrUpdateRecord(user: User, createRecordDto: CreateRecordDto) {
    const key = `${user.id}_${createRecordDto.operation_mode}`;
    // 判断key是否已存在
    const isExisted = this.redisService.exists(key);
    if (!isExisted) {
      this.redisService.set(key, createRecordDto.latest_price);
    } else {
    }
  }
}

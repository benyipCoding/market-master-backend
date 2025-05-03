import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateRecordDto } from './dto/create-record.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BackTestService {
  constructor(private readonly redisService: RedisService) {}
  async createOrUpdateRecord(user: User, createRecordDto: CreateRecordDto) {
    const key = `BackTest_${user.id}_${createRecordDto.operation_mode}`;
    this.redisService.set(key, JSON.stringify(createRecordDto));
    return key;
  }

  async deleteRecord(key: string) {
    return this.redisService.delete(key);
  }
}

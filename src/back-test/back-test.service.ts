import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateRecordDto } from './dto/create-record.dto';
import { RedisService } from 'src/redis/redis.service';
import { randomUUID } from 'crypto';

@Injectable()
export class BackTestService {
  constructor(private readonly redisService: RedisService) {}

  private generateKey(user: User) {
    return `BackTest_${user.id}`;
  }

  async createOrUpdateRecord(user: User, createRecordDto: CreateRecordDto) {
    const key = this.generateKey(user);
    const id = randomUUID();
    this.redisService.set(key, JSON.stringify({ ...createRecordDto, key, id }));
    return key;
  }

  async deleteRecord(key: string) {
    return this.redisService.delete(key);
  }

  getRecord(user: User) {
    const key = this.generateKey(user);
    return this.redisService.get(key);
  }
}

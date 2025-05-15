import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateRecordDto } from './dto/create-record.dto';
import { RedisService } from 'src/redis/redis.service';
import { randomUUID } from 'crypto';

@Injectable()
export class BackTestService {
  constructor(private readonly redisService: RedisService) {}

  generateKey(user: User) {
    return `BackTest_${user.id}`;
  }

  async createOrUpdateRecord(user: User, createRecordDto: CreateRecordDto) {
    const key = this.generateKey(user);
    let id = '';
    const isExisted = await this.redisService.exists(key);
    if (!isExisted) {
      id = randomUUID();
    } else {
      const value = await this.redisService
        .get(key)
        .then((res) => JSON.parse(res));
      id = value.id;
    }

    this.redisService.set(key, JSON.stringify({ ...createRecordDto, key, id }));
    return id;
  }

  async deleteRecord(user: User) {
    const key = this.generateKey(user);
    return this.redisService.delete(key);
  }

  getRecord(user: User) {
    const key = this.generateKey(user);
    return this.redisService.get(key);
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateRecordDto } from './dto/create-record.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BackTestService {
  constructor(private readonly redisService: RedisService) {}

  async createRecord(user: User, createRecordDto: CreateRecordDto) {
    console.log(user.display_name);
    console.log(createRecordDto.operation_mode);
  }
}

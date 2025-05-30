import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      password: process.env.REDIS_PWD,
    });
  }

  onModuleDestroy() {
    this.client.disconnect();
  }

  async set(key: string, value: any, expirySeconds?: number) {
    if (expirySeconds) {
      await this.client.set(key, value, 'EX', expirySeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string) {
    const value = await this.client.get(key);
    if (!value)
      throw new BadRequestException(`Can not find redis value: ${key}`);

    return value;
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  getClient(): Redis {
    return this.client;
  }

  async delete(key: string) {
    await this.client.del(key);
  }
}

import { Injectable } from '@nestjs/common';
import SnowflakeID from 'snowflake-id';

@Injectable()
export class SnowflakeService {
  private snowflake: SnowflakeID;
  constructor() {
    this.snowflake = new SnowflakeID({
      datacenterId: 1,
      workerId: 1,
    });
  }

  generateId() {
    return this.snowflake.generate();
  }
}

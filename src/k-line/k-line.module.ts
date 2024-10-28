import { Module } from '@nestjs/common';
import { KLineController } from './k-line.controller';
import { KLineService } from './k-line.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SnowflakeService } from './snowflake.service';

@Module({
  imports: [PrismaModule],
  controllers: [KLineController],
  providers: [KLineService, SnowflakeService],
})
export class KLineModule {}

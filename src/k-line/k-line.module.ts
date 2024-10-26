import { Module } from '@nestjs/common';
import { KLineController } from './k-line.controller';
import { KLineService } from './k-line.service';

@Module({
  controllers: [KLineController],
  providers: [KLineService]
})
export class KLineModule {}

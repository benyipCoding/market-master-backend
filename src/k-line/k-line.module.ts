import { Module } from '@nestjs/common';
import { KLineController } from './k-line.controller';
import { KLineService } from './k-line.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SnowflakeService } from './snowflake.service';
import { SymbolCategoryController } from './symbol-category.controller';
import { PeriodController } from './period.controller';
import { SymbolController } from './symbol.controller';

@Module({
  imports: [PrismaModule],
  controllers: [KLineController, SymbolCategoryController, PeriodController, SymbolController],
  providers: [KLineService, SnowflakeService],
})
export class KLineModule {}

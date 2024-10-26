import { Injectable } from '@nestjs/common';
import { CreateKlineDto } from './dto/create-kline.dto';

@Injectable()
export class KLineService {
  create(createKLineDto: CreateKlineDto) {
    console.log(createKLineDto);
  }
}

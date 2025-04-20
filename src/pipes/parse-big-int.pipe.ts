import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseBigIntPipe implements PipeTransform {
  transform(value: any) {
    try {
      return BigInt(value);
    } catch {
      throw new BadRequestException('Invalid BigInt format');
    }
  }
}

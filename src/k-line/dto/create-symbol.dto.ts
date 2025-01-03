import { IsNumber, IsString } from 'class-validator';

export class CreateSymbolDto {
  @IsString()
  label: string;

  @IsNumber()
  categoryId?: number;

  @IsNumber()
  precision: number;

  @IsNumber()
  minMove: number;
}

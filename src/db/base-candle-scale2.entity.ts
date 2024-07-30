import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class BaseCandleScale2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  time: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  open: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  high: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  low: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  close: number;
}

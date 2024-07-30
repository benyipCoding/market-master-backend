import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class BaseCandleScale5 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  time: Date;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  open: number;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  high: number;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  low: number;

  @Column({ type: 'decimal', precision: 10, scale: 5 })
  close: number;
}

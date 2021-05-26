import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '~shared/infra/database/entities/Base';

import { Category } from './Category';

@Entity('cars')
class Car extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  daily_rate: number;

  @Column({ default: true })
  available: boolean;

  @Column()
  license_plate: string;

  @Column({ type: 'float' })
  fine_amount: number;

  @Column()
  brand: string;

  @Column({ nullable: true })
  fk_category_id: string;

  @ManyToOne(() => Category, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'fk_category_id' })
  category: Category;
}

export { Car };

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '~shared/infra/database/entities/Base';

import { Category } from './Category';
import { Specification } from './Specification';

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

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumn: {
      name: 'fk_car_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'fk_specification_id',
      referencedColumnName: 'id',
    },
  })
  specifications: Specification[];
}

export { Car };

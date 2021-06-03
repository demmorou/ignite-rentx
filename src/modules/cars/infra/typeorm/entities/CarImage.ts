import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '~shared/infra/database/entities/Base';

import { Car } from './Car';

@Entity('cars_images')
class CarImage extends BaseEntity {
  @Column()
  fk_car_id: string;

  @ManyToOne(() => Car, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'fk_car_id' })
  car: Car;

  @Column()
  image_name: string;
}

export { CarImage };

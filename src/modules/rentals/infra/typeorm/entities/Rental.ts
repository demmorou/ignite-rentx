import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '~shared/infra/database/entities/Base';

import { User } from '~modules/accounts/infra/typeorm/entities/User';
import { Car } from '~modules/cars/infra/typeorm/entities/Car';

@Entity('rentals')
class Rental extends BaseEntity {
  @Column()
  fk_car_id: string;

  @Column()
  fk_user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'timestamp' })
  expected_return_date: Date;

  @Column({ type: 'float', nullable: true })
  total: number;

  @ManyToOne(() => Car, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fk_car_id' })
  car: Car;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;
}

export { Rental };

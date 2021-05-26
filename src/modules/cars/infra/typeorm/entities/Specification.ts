import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~shared/infra/database/entities/Base';

@Entity('specifications')
class Specification extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}

export { Specification };

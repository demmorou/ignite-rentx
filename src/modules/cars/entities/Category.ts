import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~database/entities/Base';

@Entity('categories')
class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}

export { Category };

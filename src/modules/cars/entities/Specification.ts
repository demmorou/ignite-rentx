import { Column, Entity } from 'typeorm';

import BaseEntity from '../../../database/models/Base';

@Entity('specifications')
class Specification extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}

export default Specification;

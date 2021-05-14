import { Column, Entity } from 'typeorm';

import BaseEntity from '../../../database/models/Base';

@Entity('users')
class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  driver_license: string;

  @Column({ default: false })
  is_admin: boolean;
}

export default User;

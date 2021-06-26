import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '~shared/infra/database/entities/Base';

import { User } from './User';

@Entity('users_tokens')
class UserToken extends BaseEntity {
  @Column()
  refresh_token: string;

  @Column()
  fk_user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expires_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'fk_user_id',
  })
  user: User;
}

export { UserToken };

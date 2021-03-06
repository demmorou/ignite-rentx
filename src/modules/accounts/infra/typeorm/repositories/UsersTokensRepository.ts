import { getRepository, Repository } from 'typeorm';

import { IFindUserTokensByUserAndTokenDTO } from '~modules/accounts/dtos';
import { ICreateUserTokenDTO } from '~modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '~modules/accounts/repositories/IUsersToensRepository';

import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expires_at,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_at,
      fk_user_id: user_id,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IFindUserTokensByUserAndTokenDTO): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: {
        fk_user_id: user_id,
        refresh_token,
      },
    });

    return userToken;
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { refresh_token: token },
    });

    return userToken;
  }
}

export { UsersTokensRepository };

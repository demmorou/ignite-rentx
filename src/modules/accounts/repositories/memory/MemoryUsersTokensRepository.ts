import { IFindUserTokensByUserAndTokenDTO } from '~modules/accounts/dtos';
import { ICreateUserTokenDTO } from '~modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '~modules/accounts/infra/typeorm/entities/UserToken';

import { IUsersTokensRepository } from '../IUsersToensRepository';

class MemoryUsersTokensRepository implements IUsersTokensRepository {
  private users_tokens: UserToken[] = [];

  async create({
    expires_at,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      created_at: new Date(),
      updated_at: new Date(),
      expires_at,
      refresh_token,
      fK_user_id: user_id,
    });

    this.users_tokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IFindUserTokensByUserAndTokenDTO): Promise<UserToken> {
    const usersTokens = this.users_tokens.find(
      (userToken) =>
        userToken.fk_user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    const index = this.users_tokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.users_tokens.splice(index, 1);
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = this.users_tokens.find(
      (user) => user.refresh_token === token
    );

    return userToken;
  }
}

export { MemoryUsersTokensRepository };

import { IFindUserTokensByUserAndTokenDTO } from '../dtos';
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    data: IFindUserTokensByUserAndTokenDTO
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };

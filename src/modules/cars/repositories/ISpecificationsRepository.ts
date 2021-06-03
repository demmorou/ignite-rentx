import { ICreateSpecificationDTO } from '~modules/cars/dtos';
import { Specification } from '~modules/cars/infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };

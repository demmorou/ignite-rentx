import { ICreateSpecificationDTO } from '~modules/cars/dtos';
import { Specification } from '~modules/cars/entities/Specification';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };

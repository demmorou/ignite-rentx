import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import Specification from '../entities/Specification';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export default ISpecificationsRepository;

import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import Specification from '../model/Specification';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}

export default ISpecificationsRepository;

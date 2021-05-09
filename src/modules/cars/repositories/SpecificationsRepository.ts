import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';
import Specification from '../model/Specification';
import ISpecificationsRepository from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];
  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (spec) => spec.name === name
    );

    return specification;
  }
}

export default SpecificationsRepository;

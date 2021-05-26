import { ICreateCarDTO } from '../dtos';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  save(car: Car): Promise<void>;
}

export { ICarsRepository };

import { ICreateCarDTO } from '../dtos';
import { IFindAvailableDTO } from '../dtos/IFindAvailableDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  save(car: Car): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(data?: IFindAvailableDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };

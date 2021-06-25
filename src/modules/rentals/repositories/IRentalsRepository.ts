import { ICreateRentalDTO } from '../dtos';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  save(rental: Rental): Promise<void>;
  findByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}

export { IRentalsRepository };

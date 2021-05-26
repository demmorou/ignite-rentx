import { ICreateCarDTO } from '~modules/cars/dtos';
import { Car } from '~modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../IcarsRepository';

class MemoryCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      brand,
      fk_category_id: category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);
  }

  async save(car: Car): Promise<void> {
    const carIndex = this.cars.findIndex(({ id }) => id === car.id);

    this.cars[carIndex] = car;
  }
}

export { MemoryCarsRepository };

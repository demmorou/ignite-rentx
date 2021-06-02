import { ICreateCarDTO } from '~modules/cars/dtos';
import { Car } from '~modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

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
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      fk_category_id: category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      available: true,
    });

    this.cars.push(car);

    return car;
  }

  async save(car: Car): Promise<void> {
    const carIndex = this.cars.findIndex(({ id }) => id === car.id);

    this.cars[carIndex] = car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }
}

export { MemoryCarsRepository };

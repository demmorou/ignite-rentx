import { ICreateCarDTO } from '~modules/cars/dtos';
import { IFindAvailableDTO } from '~modules/cars/dtos/IFindAvailableDTO';
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

  async findAvailable({
    brand,
    category_id,
    name,
  }: IFindAvailableDTO): Promise<Car[]> {
    let availables = this.cars.filter((car) => car.available);

    if (name) {
      availables = availables.filter((car) => car.name === name);
    }

    if (category_id) {
      availables = availables.filter(
        (car) => car.fk_category_id === category_id
      );
    }

    if (brand) {
      availables = availables.filter((car) => car.brand === brand);
    }

    return availables;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === car_id);

    this.cars[carIndex].available = available;
  }
}

export { MemoryCarsRepository };

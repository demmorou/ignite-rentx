import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '~modules/cars/dtos';
import { IFindAvailableDTO } from '~modules/cars/dtos/IFindAvailableDTO';
import { ICarsRepository } from '~modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      fk_category_id: category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async save(car: Car): Promise<void> {
    await this.repository.save(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });

    return car;
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IFindAvailableDTO): Promise<Car[]> {
    const query = this.repository.createQueryBuilder();

    query.where('available = :available', { available: true });

    if (brand) {
      query.andWhere('brand = :brand', { brand });
    }

    if (name) {
      query.andWhere('name = :name', { name });
    }

    if (category_id) {
      query.andWhere('fk_category_id = :category_id', { category_id });
    }

    const cars = await query.getMany();

    return cars;
  }
}

export { CarsRepository };

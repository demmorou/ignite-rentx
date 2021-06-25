import { getRepository, IsNull, Repository } from 'typeorm';

import { ICreateRentalDTO } from '~modules/rentals/dtos';
import { IRentalsRepository } from '~modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      fk_car_id: car_id,
      fk_user_id: user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async save(rental: Rental): Promise<void> {
    await this.repository.save(rental);
  }

  async findByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        fk_car_id: car_id,
        end_date: IsNull(),
      },
    });

    return rental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        fk_user_id: user_id,
        end_date: IsNull(),
      },
    });

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id } });

    return rental;
  }
}

export { RentalsRepository };

import { inject, injectable } from 'tsyringe';

import { Rental } from '~modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '~modules/rentals/repositories/IRentalsRepository';

type IRequest = {
  user_id: string;
};

@injectable()
class ListRentalsByUser {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}

export { ListRentalsByUser };

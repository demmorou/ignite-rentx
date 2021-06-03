import { getRepository, Repository } from 'typeorm';

import { ICreateCarImageDTO } from '~modules/cars/dtos/ICreateCarImageDTO';
import { ICarsImagesRepository } from '~modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const car_image = this.repository.create({ fk_car_id: car_id, image_name });

    await this.repository.save(car_image);

    return car_image;
  }

  async save(carImage: CarImage): Promise<void> {
    await this.repository.save(carImage);
  }
}

export { CarsImagesRepository };

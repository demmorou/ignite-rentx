import { ICreateCarImageDTO } from '~modules/cars/dtos/ICreateCarImageDTO';
import { CarImage } from '~modules/cars/infra/typeorm/entities/CarImage';

import { ICarsImagesRepository } from '../ICarsImagesRepository';

class MemoryCarsImagesRepository implements ICarsImagesRepository {
  private cars_images: CarImage[] = [];

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const car_image = new CarImage();

    Object.assign(car_image, { fk_car_id: car_id, image_name });

    this.cars_images.push(car_image);

    return car_image;
  }

  async save(carImage: CarImage): Promise<void> {
    const carImageIndex = this.cars_images.findIndex(
      ({ id }) => id === carImage.id
    );

    this.cars_images[carImageIndex] = carImage;
  }
}

export { MemoryCarsImagesRepository };

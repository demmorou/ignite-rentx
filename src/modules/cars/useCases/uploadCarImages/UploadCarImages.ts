import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '~modules/cars/repositories/ICarsImagesRepository';

type IRequest = {
  car_id: string;
  images_name: string[];
};

@injectable()
class UploadCarImages {
  constructor(
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create({ car_id, image_name: image });
    });
  }
}

export { UploadCarImages };

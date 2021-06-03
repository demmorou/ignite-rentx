import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImages } from './UploadCarImages';

type IFiles = {
  filename: string;
};

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImage = container.resolve(UploadCarImages);

    const images_name = images.map((image) => image.filename);

    await uploadCarImage.execute({ car_id, images_name });

    return response.status(204).send();
  }
}

export { UploadCarImagesController };

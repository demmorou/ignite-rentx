import { Request, Response } from 'express';

import CreateSpecificationUseCase from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(
    private readonly createSpecification: CreateSpecificationUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecification.execute({ name, description });

    return response.status(201).send();
  }
}

export default CreateSpecificationController;

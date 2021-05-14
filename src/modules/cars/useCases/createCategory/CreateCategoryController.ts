import { Request, Response } from 'express';

import CreateCategoryUseCase from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private readonly createCategory: CreateCategoryUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.createCategory.execute({ name, description });

    return response.status(201).send();
  }
}

export default CreateCategoryController;

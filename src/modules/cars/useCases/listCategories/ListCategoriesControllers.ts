import { Request, Response } from 'express';

import ListCategoriesUseCase from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private readonly listCategories: ListCategoriesUseCase) {}
  handle(request: Request, response: Response): Response {
    const categories = this.listCategories.execute();

    return response.json(categories);
  }
}

export default ListCategoriesController;

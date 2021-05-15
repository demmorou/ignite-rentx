import { inject, injectable } from 'tsyringe';

import { AppError } from '~errors/AppError';
import { ICategoriesRepository } from '~modules/cars/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

/**
 * Service to create a new category
 */
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}
  /**
   * Public method to create a new category
   * @param data Object with attributes of the new category
   * @returns returns void
   */
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };

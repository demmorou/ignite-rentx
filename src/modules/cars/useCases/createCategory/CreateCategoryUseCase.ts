import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

/**
 * Service to create a new category
 */
class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}
  /**
   * Public method to create a new category
   * @param data Object with attributes of the new category
   * @returns returns void
   */
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;

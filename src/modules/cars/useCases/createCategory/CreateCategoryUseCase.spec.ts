import { ICreateCategoryDTO } from '~modules/cars/dtos';
import { CategoriesRepositoryInMemory } from '~modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create Category', () => {
  let createCategory: CreateCategoryUseCase;
  let categoriesRepository: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able a new category', async () => {
    const category: ICreateCategoryDTO = {
      name: 'Name 1',
      description: 'Description 1',
    };

    await createCategory.execute(category);

    const categoryCreated = await categoriesRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
    expect(categoryCreated.name).toBe(categoryCreated.name);
    expect(categoryCreated.description).toBe(categoryCreated.description);
  });

  it('should not be able a new category with some name', async () => {
    const category: ICreateCategoryDTO = {
      name: 'Name 1',
      description: 'Description 1',
    };

    await createCategory.execute(category);

    await expect(createCategory.execute(category)).rejects.toHaveProperty(
      'message',
      'Category already exists'
    );
  });
});

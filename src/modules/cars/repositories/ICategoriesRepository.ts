import { ICreateCategoryDTO } from '~modules/cars/dtos';
import { Category } from '~modules/cars/entities/Category';

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };

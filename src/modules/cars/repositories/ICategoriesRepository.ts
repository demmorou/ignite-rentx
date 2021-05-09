import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../model/Category';

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create(data: ICreateCategoryDTO): void;
}

export default ICategoriesRepository;

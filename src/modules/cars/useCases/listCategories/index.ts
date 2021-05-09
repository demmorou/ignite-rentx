import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import ListCategoriesController from './ListCategoriesControllers';
import ListCategoriesUseCase from './ListCategoriesUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };

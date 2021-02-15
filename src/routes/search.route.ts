import { Router } from 'express';
import SearchController from '../controllers/search.controller';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class SearchRoute implements Route {
  public path = '/api';
  public router = Router();
  public searchController = new SearchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/search`, this.searchController.search);
    this.router.get(`${this.path}/clear-cache`, this.searchController.clearCache);
  }
}

export default SearchRoute;

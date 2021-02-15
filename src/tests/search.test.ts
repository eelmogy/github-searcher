import request from 'supertest';
import App from '../app';
import SearchRoute from '../routes/search.route';
import { SearchDto } from '../dtos/search.dto';
import { Search } from '../interfaces/search.interface';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Search', () => {
  describe('[GET] /api/search', () => {
    it('response should return users based on search value', () => {
      const searchData: SearchDto = {
        type: 'user',
        search: 'eelmogy',
      };
      const searchRoute = new SearchRoute();
      const app = new App([searchRoute]);

      return request(app.getServer()).get('/api/search').query(searchData).expect(200);
    });
  });

  describe('[GET] /api/search', () => {
    it('response should return repos based on search value', () => {
      const searchData: SearchDto = {
        type: 'repo',
        search: 'user-hobbies',
      };
      const searchRoute = new SearchRoute();
      const app = new App([searchRoute]);

      return request(app.getServer()).get('/api/search').query(searchData).expect(200);
    });
  });

  describe('[GET] /api/clear-cache', () => {
    it('response should be cache cleared', () => {
      const searchRoute = new SearchRoute();
      const app = new App([searchRoute]);

      return request(app.getServer()).get(`${searchRoute.path}/clear-cache`).expect(200);
    });
  });


});

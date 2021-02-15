import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import SearchRoute from './routes/search.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new SearchRoute()]);

app.listen();

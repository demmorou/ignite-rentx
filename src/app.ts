import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import './database';
import './shared/container';

import { errorInterceptor } from './interceptors/errorInterceptor';
import { routes } from './routes';
import swagger from './swagger.json';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(routes);

app.use(errorInterceptor);

export default app;

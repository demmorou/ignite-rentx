import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import createdConnection from '~shared/infra/database';
import '~shared/container';

import swagger from '../../../swagger.json';
import { errorInterceptor } from './interceptors/errorInterceptor';
import { routes } from './routes';

createdConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(routes);

app.use(errorInterceptor);

export default app;

import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import './database';
import './shared/container';

import { routes } from './routes';
import swagger from './swagger.json';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(routes);

export default app;

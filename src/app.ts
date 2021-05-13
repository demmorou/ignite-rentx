import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import swagger from './swagger.json';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

app.use(routes);

export default app;

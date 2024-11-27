import express, { Express } from 'express';
import { HttpServer } from '../core/utils/http-server';
import { middleware } from './middleware';
import { controllers } from './controllers';

const apiApp: Express = express();
const httpServer = new HttpServer(apiApp);

middleware.forEach((interceptor) => {
    apiApp.use(interceptor);
});

controllers.forEach((controller) => {
    controller.initialize(httpServer);
});

export { apiApp };

import express, { Express } from 'express';
import { HttpServer } from './controllers';
import { middleware } from './middleware';
import { controllers } from './controllers/controllers';

const apiApp: Express = express();
const httpServer = new HttpServer(apiApp);

middleware.forEach((interceptor) => {
    apiApp.use(interceptor);
});

controllers.forEach((controller) => {
    controller.initialize(httpServer);
});

export { apiApp };

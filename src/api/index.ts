import express, { Express } from 'express';
import { HttpServer } from './controllers';
import { interceptors } from './interceptors';
import { controllers } from './controllers/controllers';

const apiApp: Express = express();
const httpServer = new HttpServer(apiApp);

interceptors.forEach((interceptor) => {
    apiApp.use(interceptor);
});

controllers.forEach((controller) => {
    controller.initialize(httpServer);
});

export {apiApp};

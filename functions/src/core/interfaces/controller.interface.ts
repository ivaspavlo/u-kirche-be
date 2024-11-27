import { HttpServer } from '../utils/http-server';

export interface Controller {
    initialize(httpServer: HttpServer): void;
}

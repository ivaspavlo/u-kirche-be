import * as nodemailer from 'nodemailer';
import { RequestHandler } from 'express';
import { Controller } from '../../core/interfaces';
import { HttpServer } from '../../core/utils/http-server';

export class MessageController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/meet', this.meet.bind(this), []);
    }

    private readonly meet: RequestHandler = async (_, res, next) => {
        res.send({
            status: `API is working!`
        });
        next();
    };
}

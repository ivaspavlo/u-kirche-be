import { RequestHandler } from 'express';
import { Controller, HttpServer } from '../index';
import { ENV } from '../../../core/constants';

const { defineString } = require('firebase-functions/params');

const env = defineString(ENV.ENVIRONMENT);

let counter:number = 1;

export class RootController implements Controller {

    initialize(httpServer: HttpServer): void {
        httpServer.get('/', this.root.bind(this));
    }

    private readonly root: RequestHandler = async (req, res, next) => {
        console.log('test ----------->', env.value());
        res.send({
            'status': `API is working! Counter: ${(counter++)}`
        });
        next();
    }
}
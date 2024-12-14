import { RequestHandler } from 'express';
import { HttpServer } from '../../core/utils';
import { Controller } from '../../core/interfaces';
import { contentService } from '../../core/services/content.service';
import { ROLE } from '../../core/constants';

export class ContentController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.post('/content', this.createContent.bind(this), [ROLE.SUPERADMIN]);
        httpServer.put('/content', this.updateContent.bind(this), [ROLE.ADMIN, ROLE.SUPERADMIN]);
        httpServer.get('/content', this.getContent.bind(this), []);
    }

    private readonly getContent: RequestHandler = async (_, res, next) => {
        const content = await contentService.getContent();
        res.send(content);
        next();
    };

    private readonly createContent: RequestHandler = async (req, res, next) => {
        const content = await contentService.createContent(req.body);
        res.send(content);
        next();
    };

    private readonly updateContent: RequestHandler = async (req, res, next) => {
        const content = await contentService.updateContent(req.body);
        res.send(content);
        next();
    };
}

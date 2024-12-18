import { Controller } from '../../core/interfaces';
import { RootController } from './root-controller';
import { ArticleController } from './articles-controller';
import { UserController } from './user-controller';
import { AuthController } from './auth-controller';
import { ContentController } from './content-controller';
import { MessageController } from './message-controller';

export const controllers: Controller[] = [
    new RootController(),
    new ArticleController(),
    new UserController(),
    new AuthController(),
    new ContentController(),
    new MessageController()
];

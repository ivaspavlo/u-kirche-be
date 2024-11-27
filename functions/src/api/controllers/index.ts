import { Controller } from '../../core/interfaces';
import { RootController } from './root-controller';
import { ArticleController } from './articles-controller';
import { UserController } from './user-controller';
import { AuthController } from './auth-controller';

export const controllers: Controller[] = [
    new RootController(),
    new ArticleController(),
    new UserController(),
    new AuthController()
];

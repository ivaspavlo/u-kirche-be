import { Controller } from './index';
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

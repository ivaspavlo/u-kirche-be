import { Controller } from './index';
import { RootController } from './root-controller';
import { ArticleController } from './articles-controller/articles-controller';
import { UserController } from './user-controller/user-controller';

export const controllers: Array<Controller> = [
    new RootController(),
    new ArticleController(),
    new UserController()
];

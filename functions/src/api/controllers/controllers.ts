import { Controller } from './index';
import { RootController } from './root-controller';
import { ProductController } from './product-controller/product-controller';
import { AdminController } from './administrative-controller/admin-controller';
import { ArticleController } from './articles-controller/articles-controller';
import { UserController } from './user-controller/user-controller';

export const controllers: Array<Controller> = [
    new RootController(),
    new ProductController(),
    new AdminController(),
    new ArticleController(),
    new UserController()
];

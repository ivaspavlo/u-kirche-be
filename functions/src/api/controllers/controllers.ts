import { Controller } from './index';
import { RootController } from './root-controller';
import { AccountController } from './account-controller/account-controller';
import { ProductController } from './product-controller/product-controller';
import { AdminController } from './administrative-controller/admin-controller';
import { ArticleController } from './articles-controller/articles-controller';

export const controllers: Array<Controller> = [
    new RootController(),
    new ProductController(),
    new AccountController(),
    new AdminController(),
    new ArticleController()
];

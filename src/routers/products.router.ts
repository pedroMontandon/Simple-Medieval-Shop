import { Router } from 'express';
import productsController from '../controller/products.controller';
import productsMiddlewares from '../middlewares/products.middlewares';

const productsRouter = Router();

productsRouter.post('/', productsMiddlewares.verifyProduct, productsController.createProduct);
productsRouter.get('/', productsController.getAllProducts);

export default productsRouter;
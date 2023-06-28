import { Router } from 'express';
import ordersController from '../controller/orders.controller';
import ordersMiddlewares from '../middlewares/orders.middlewares';

const ordersRouter = Router();

ordersRouter.get('/', ordersController.getAllOrders);
ordersRouter.post(
  '/', 
  ordersMiddlewares.verifyToken,
  ordersMiddlewares.verifyUser, 
  ordersMiddlewares.verifyProducts, 
  ordersController.createOrder,
);

export default ordersRouter;
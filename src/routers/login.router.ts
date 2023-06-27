import { Router } from 'express';
import loginController from '../controller/login.controller';
import loginMiddlewares from '../middlewares/login.middlewares';

const loginRouter = Router();

loginRouter.post('/', loginMiddlewares.verifyLogin, loginController.login);

export default loginRouter;
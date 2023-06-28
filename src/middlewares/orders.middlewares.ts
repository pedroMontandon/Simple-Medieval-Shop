import { NextFunction, Request, Response } from 'express';
import ordersService from '../service/orders.service';

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  const decodedToken = await ordersService.checkToken(authorization);
  if (!decodedToken) return res.status(401).json({ message: 'Invalid token' });
  return next();
}

async function verifyUser(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: '"userId" is required' });
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  } 
  const foundUser = await ordersService.checkUserId(userId);
  if (!foundUser) return res.status(404).json({ message: '"userId" not found' }); 
  return next();
}

async function verifyProducts(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { productIds } = req.body;
  if (!productIds) return res.status(400).json({ message: '"productIds" is required' });
  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }
  if (!productIds[0]) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }
  return next();
}

export default {
  verifyToken,
  verifyUser,
  verifyProducts,
};